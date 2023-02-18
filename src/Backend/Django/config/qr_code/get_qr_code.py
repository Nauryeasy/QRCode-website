from PIL import Image
import io
import requests


def get_png_from_blob(blob):
    import base64
    data = blob.split(",")[1]
    decoded_data = base64.b64decode(data)
    with open("image.png", "wb") as f:
        f.write(decoded_data)
