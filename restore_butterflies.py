import re

file_path = r'C:\Users\germa\Downloads\demos\invitacion_clari_final.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# The exact butterflies div to insert
exact_butterflies = """      <div class="butterflies">
        <div class="bf bf1"></div>
        <div class="bf bf2"></div>
        <div class="bf bf3"></div>
        <div class="bf bf4"></div>
      </div>"""

# Ensure it's not already there
html = html.replace(exact_butterflies, '')

# Insert it right after <div id="main">
html = html.replace('<div id="main">', f'<div id="main">\n{exact_butterflies}')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Restored butterflies HTML")
