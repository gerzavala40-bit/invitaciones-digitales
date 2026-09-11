import re

file_path = r'C:\Users\germa\Downloads\demos\invitacion_clari_final.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Reemplazar imagen de portada circular por clara.png
html = re.sub(
    r'<img src="FOTO REDONDA/WhatsApp Image 2026-08-03 at 07.41.30.jpeg"',
    r'<img src="../clara.png"',
    html
)
# Just in case the previous regex missed it because of how it was formatted
html = html.replace('FOTO REDONDA/WhatsApp Image 2026-08-03 at 07.41.30.jpeg', '../clara.png')

# 2. Hacer que las mariposas vuelen por toda la tarjeta (position: fixed)
html = html.replace('.butterflies {\n      position: absolute;', '.butterflies {\n      position: fixed;')
html = html.replace('.butterflies { position: absolute;', '.butterflies { position: fixed;')

# Extraer el div de mariposas exactamente
butterflies_match = re.search(r'(<div class="butterflies">.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>)', html, flags=re.DOTALL)
# Wait, let's just find the exact string I inserted previously.
exact_butterflies = """      <div class="butterflies">
        <div class="bf bf1"></div>
        <div class="bf bf2"></div>
        <div class="bf bf3"></div>
        <div class="bf bf4"></div>
      </div>"""

if exact_butterflies in html:
    html = html.replace(exact_butterflies, '')
    html = html.replace('<div class="mobile-container">', f'<div class="mobile-container" style="position: relative;">\n{exact_butterflies}')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated successfully")
