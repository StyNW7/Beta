import torch
from diffusers import AutoPipelineForImage2Image
import torch_directml

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