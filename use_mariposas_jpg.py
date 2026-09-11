import re

file_path = r'C:\Users\germa\Downloads\demos\invitacion_clari_final.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the SVG butterfly with the image from mariposas.jpg and add mix-blend-mode
old_bg = r"background-image: url\('data:image/svg\+xml;utf8,<svg.*?svg>'\);"
new_bg = r"background-image: url('../mariposas.jpg');\n      mix-blend-mode: multiply;"

html = re.sub(old_bg, new_bg, html, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated butterflies to use mariposas.jpg")
