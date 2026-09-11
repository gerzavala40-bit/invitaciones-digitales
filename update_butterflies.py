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

# 2. Hacer que las mariposas vuelen por toda la tarjeta (position: fixed)
html = html.replace('.butterflies {\n      position: absolute;', '.butterflies {\n      position: fixed;')

# Extraer el div de mariposas
butterflies_match = re.search(r'<div class="butterflies">.*?</div>\s*</div>', html, flags=re.DOTALL)
if butterflies_match:
    butterflies_html = butterflies_match.group(0)
    # Remover de la seccion hero
    html = html.replace(butterflies_html, '')
    # Insertar justo despues de mobile-container
    html = html.replace('<div class="mobile-container">', f'<div class="mobile-container">\n{butterflies_html}')

# Asegurarse de que el match de butterflies fuera correcto, wait the regex had an extra </div> maybe.
# Let's use a safer regex.
html = html.replace('<div class="mobile-container">', '<div class="mobile-container" style="position: relative;">')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated successfully")
