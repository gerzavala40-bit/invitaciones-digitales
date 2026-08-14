
from PIL import Image

img_path = "C:/Users/germa/.gemini/antigravity/brain/2c3a9e6b-c352-4151-a10e-e2bc0182afdc/.user_uploaded/media_1786560783910.png"
out_path = "C:/Te invitoapp/invitaciones-digitales/public/icon-novios-gold.png"

img = Image.open(img_path).convert("RGBA")
# Crop left part of the image (square)
# Image is 901x373, couple is on the left
img_cropped = img.crop((0, 0, 420, 373))

datas = img_cropped.getdata()
new_data = []

# Gold color: R=201, G=166, B=107
for item in datas:
    # Convert to grayscale luminance
    lum = 0.299 * item[0] + 0.587 * item[1] + 0.114 * item[2]
    # If the pixel is dark enough (it is a drawing line), make it gold.
    # The watermarks are light grey (lum > 180). Lines are dark (lum < 100).
    if lum < 120 and item[3] > 50:
        # It is a line
        new_data.append((201, 166, 107, 255))
    else:
        # Transparent background
        new_data.append((255, 255, 255, 0))

img_cropped.putdata(new_data)
img_cropped.save(out_path, "PNG")
print("Done processing watermarked line art")

