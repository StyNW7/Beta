import torch
import base64
from PIL import Image
from io import BytesIO
from diffusers import AutoPipelineForImage2Image
import torch_directml
from typing import Dict, Union

pipe = None

def model_load():
    global pipe

    if pipe is not None:
        return pipe

    # Check for CUDA GPU and set the device
    if torch.cuda.is_available():
        device = "cuda"
    elif torch_directml.is_available():
        device = torch.device(torch_directml.device())
    else:
        raise RuntimeError("CUDA is not available. This model requires a GPU.")
    
    # Load the model pipeline ONCE when the server starts
    # Using float16 for faster inference and less memory usage
    pipe = AutoPipelineForImage2Image.from_pretrained(
        "InstantX/InstantStyle", 
        torch_dtype=torch.float16, 
        variant="fp16"
    ).to(device)

# Helpers functions
def decode_base64_image(base64_string:str) -> Image.Image:
    """Decodes a Base64 string into a PIL Image."""
    image_data = base64.b64decode(base64_string)
    return Image.open(BytesIO(image_data)).convert("RGB")

def encode_image_to_base64(image:Image.Image)->str:
    """Encodes a PIL Image into a Base64 string."""
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')


# Main model inferencing functions

def style_trans(content_image_b64:str, style_image_b64:str) -> Dict[Union[str,None], str]:
    try:
        content_image = decode_base64_image(content_image_b64)
        style_image = decode_base64_image(style_image_b64)

        # Run inference
        # The model works best if you provide a simple prompt
        image = pipe(
            prompt="A beautiful artistic image",
            image=content_image,
            style_image=style_image,
            strength=0.8, # How much to stylize, 0.0-1.0
            guidance_scale=7.5
        ).images[0]
        
        # Encode the output image to Base64 to send in the response
        output_image_base64 = encode_image_to_base64(image)

        return {"stylized_image": output_image_base64, "error":None}

    except Exception as e:
        print(f"An error occurred: {e}")
        return { "stylized_image":None, "error": "An internal error occurred during image generation."}