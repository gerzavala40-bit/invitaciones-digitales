
from PIL import Image

img = Image.open("C:/Te invitoapp/invitaciones-digitales/public/portada-boda-elegante.png").convert("RGBA")
datas = img.getdata()
new_data = []

# Gold color: R=201, G=166, B=107
for item in datas:
    lum = 0.299 * item[0] + 0.587 * item[1] + 0.114 * item[2]
    if lum > 200:
        # Light background -> Transparent
        new_data.append((0, 0, 0, 0))
    else:
        # Drawing lines -> Gold
        # Use (255 - lum) as alpha for anti-aliasing smooth edges
        alpha = int(255 - lum)
        new_data.append((201, 166, 107, alpha if alpha < 255 else 255))

img.putdata(new_data)
img.save("C:/Te invitoapp/invitaciones-digitales/public/portada-boda-elegante-dark.png", "PNG")
print("Processed splash screen!")

