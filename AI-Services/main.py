from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_ollama import OllamaLLM
from langchain.chains import RetrievalQA

app = Flask(__name__)
CORS(app)

# Initialize components once when the server starts
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

vectorstore = Chroma(
    collection_name="indonesian_culture",
    embedding_function=embedding_model,
    persist_directory="chroma_db"
)

llm = OllamaLLM(model="my-assistant")

retriever = vectorstore.as_retriever()

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
)

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

@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()

    if not data or "query" not in data:
        return jsonify({"error": "Missing 'query' field in request"}), 400

    query = data["query"]

    try:
        response = qa_chain.invoke(query)
        return jsonify({"answer": response["result"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5000, debug=True)