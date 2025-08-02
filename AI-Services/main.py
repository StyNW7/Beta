from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import requests
from io import BytesIO
from ailibs.style_transfer import style_trans, is_valid_base64, model_load

app = Flask(__name__)
CORS(app)

# Load model
print("Loading AI style transfer model...")
try:
    model_load()
    print("✅ AI model loaded successfully!")
except Exception as e:
    print(f"❌ Failed to load AI model: {e}")

@app.route('/')
def home():
    return render_template('index.html')

def load_data():
    info_tourism = pd.read_csv("Recommendation/tourism_with_id.csv")
    tourism_rating = pd.read_csv("Recommendation/tourism_rating.csv")
    # users = pd.read_csv(os.path.join(BASE_DIR, "user.csv"))

    all_tourism_rate = tourism_rating
    all_tourism = pd.merge(all_tourism_rate, info_tourism[["Place_Id","Place_Name","Description","City","Category"]],
                           on='Place_Id', how='left')
    all_tourism['city_category'] = all_tourism[['City','Category']].agg(' '.join,axis=1)
    preparation = all_tourism.drop_duplicates("Place_Id")

    tourism_new = pd.DataFrame({
        "id": preparation.Place_Id.tolist(),
        "name": preparation.Place_Name.tolist(),
        "category": preparation.Category.tolist(),
        "description": preparation.Description.tolist(),
        "city": preparation.City.tolist(),
        "city_category": preparation.city_category.tolist()
    })

    cv = CountVectorizer()
    cv_matrix = cv.fit_transform(tourism_new['city_category'])
    cosine_sim = cosine_similarity(cv_matrix)
    cosine_sim_df = pd.DataFrame(cosine_sim, index=tourism_new['name'], columns=tourism_new['name'])
    
    return tourism_new, cosine_sim_df

data, cosine_sim_df = load_data()

def tourism_recommendations(place_name, k=5):
    # Case-insensitive match
    matched_names = [name for name in cosine_sim_df.columns if name.lower() == place_name.lower()]
    if not matched_names:
        return []

    place_name = matched_names[0]
    index = cosine_sim_df.loc[:, place_name].to_numpy().argpartition(range(-1, -k - 1, -1))
    closest = cosine_sim_df.columns[index[-1:-(k + 2):-1]]
    closest = closest.drop(place_name, errors='ignore')

    return pd.DataFrame({"name": closest}).merge(
        data[['name', 'category', 'description', 'city']],
        on='name'
    ).head(k).to_dict(orient='records')


@app.route('/recommend', methods=['POST'])
def recommend():
    data_json = request.get_json()
    if not data_json or 'place_name' not in data_json:
        return jsonify({"error": "Missing 'place_name' in request body"}), 400

    place_name = data_json['place_name']
    results = tourism_recommendations(place_name)
    
    if not results:
        return jsonify({"error": f"No recommendations found for place '{place_name}'"}), 404

    return jsonify(results)

@app.route('/style-transfer', methods=['POST'])
def stytrans():
    try:
        user_token = request.headers.get('Authorization')
        if not user_token:
            return jsonify({"error": "Authorization token required"}), 401
        
        if user_token.startswith('Bearer '):
            user_token = user_token[7:]

        data_json = request.get_json()
        if not data_json:
            return jsonify({"error": "No data provided"}), 400
        
        if not data_json.get('content_image') or not data_json.get('style_image'):
            return jsonify({"error": "Content image or Style image is not provided"}), 400
        
        if not is_valid_base64(data_json['content_image']):
            return jsonify({"error": "Content image must be a valid base64 string"}), 400
            
        if not is_valid_base64(data_json['style_image']):
            return jsonify({"error": "Style image must be a valid base64 string"}), 400
        
        if not ('influence' in data_json and isinstance(data_json['influence'], (int, float))): # the influence of the style to the end (0.0-1.0)
            data_json['influence'] = 0.8

        if not ('creativity' in data_json or not isinstance(data_json['creativity'], (int, float))): # 1-15 (less is more artistic, while higher closer to the prompt)
            data_json['creativity'] = 7

        payload = style_trans(data_json['content_image'], data_json['style_image'], data_json['influence'], data_json['creativity'])

        image = payload.get('stylized_image')
        error = payload.get('error')

        if error :
            return jsonify({"error":error}), 500
        
        if not image:
            return jsonify({"error": "Failed to generate image"}), 500

        img_buffer = BytesIO()
        
        image_format = 'JPEG'  # or 'JPEG' depending on your needs
        image.save(img_buffer, format=image_format)
        img_buffer.seek(0)  # Reset buffer position to beginning
        
        files = {
            'image': (
                'generated_image.jpeg',  # filename
                img_buffer.getvalue(),   # file content as bytes
                'image/jpeg'             # MIME type
            )
        }
        
        # Prepare form data
        form_data = {
            'description': "No decription",
            'isaigen': 'true'
        }

        upload_headers = {
            'Authorization': f'Bearer {user_token}'
        }


        # Make a request to your Express API endpoint
        express_api_url = "http://localhost:3000/api/files/upload-avatar"
        
        # Make the request with files and form data (NOT JSON)
        response = requests.post(
            express_api_url,
            files=files,
            data=form_data,     
            headers=upload_headers,
            timeout=30
        )
        
        # Check response
        if response.status_code == 201:  # uploadAvatar returns 201 on success
            upload_result = response.json()
            return jsonify({
                "message": "Style transfer completed and saved successfully",
                "image": upload_result['avatar'],
                "imageUrl": upload_result['avatar']['imageUrl']
            })
        else:
            print(f"Upload failed: {response.status_code} - {response.text}")
            return jsonify({
                "error": f"Failed to save image: {response.text}"
            }), 500
            
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Backend connection error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Processing error: {str(e)}"}), 500


if __name__ == '__main__':
    print("Starting Flask server for local AI models...")
    app.run(host='0.0.0.0', port=5000, debug=True)