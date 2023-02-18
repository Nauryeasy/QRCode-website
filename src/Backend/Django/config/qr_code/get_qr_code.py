from PIL import Image
import io
import requests


def get_png_from_blob(link):
    response = requests.get(link)

    img_io = io.BytesIO(response.content)

    img = Image.open(img_io)

    png_img = img.convert("RGBA")

    png_img.save("image.png", format="PNG")