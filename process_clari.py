import os
import re

template_path = r'C:\Users\germa\Downloads\demos\DISEÑOS DE TARJETAS\demo-15-camila-glam.html'
output_path = r'C:\Users\germa\Downloads\demos\invitacion_clari_final.html'

with open(template_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Colors
html = re.sub(r'--bg: #031326;', '--bg: #e6f2fb;', html)
html = re.sub(r'--bg-soft: #081B33;', '--bg-soft: #ffffff;', html)
html = re.sub(r'--bg-card: #0A223D;', '--bg-card: #f0f8ff;', html)
html = re.sub(r'--text: #FDFCF8;', '--text: #1a4a75;', html)
html = re.sub(r'--text-muted: rgba\(253, 252, 248, 0\.65\);', '--text-muted: #4a78a5;', html)
html = re.sub(r'--accent: #D4C9BD;', '--accent: #6ba4d8;', html)
html = re.sub(r'--accent-deep: #BFA997;', '--accent-deep: #407eb8;', html)
html = re.sub(r'--gold: #C2A878;', '--gold: #1a4a75;', html)
html = re.sub(r'--gold-soft: #E0CFA1;', '--gold-soft: #a3c9ea;', html)
html = re.sub(r'--line: rgba\(253, 252, 248, 0\.12\);', '--line: rgba(26, 74, 117, 0.2);', html)

# 2. Update Name
html = html.replace('Camila', 'Clari')
html = html.replace('CAMILA', 'CLARI')

# 3. Translucent Background Image
bg_img = 'FOTO TRASLUCIDA DE FONDO/WhatsApp Image 2026-08-03 at 07.41.28.jpeg'
# For light theme, we use a light overlay
html = html.replace('background: var(--bg);', f'background: linear-gradient(rgba(230, 242, 251, 0.85), rgba(230, 242, 251, 0.85)), url("{bg_img}") center/cover fixed;')

# 4. Circular Photo
round_img = 'FOTO REDONDA/WhatsApp Image 2026-08-03 at 07.41.30.jpeg'
html = re.sub(
    r'<div style="width: 100%; max-height: 55vh; overflow: hidden; margin-bottom: 2rem;">\s*<img src="descarga \(5\)\.webp" alt="Portada Clari" style=".*? display: block;" />\s*</div>',
    f'<div style="width: 250px; height: 250px; overflow: hidden; margin: 0 auto 2rem auto; border-radius: 50%; border: 4px solid var(--gold); box-shadow: 0 0 20px rgba(26, 74, 117, 0.2);"><img src="{round_img}" alt="Portada Clari" style="width: 100%; height: 100%; object-fit: cover; display: block;" /></div>',
    html, flags=re.DOTALL
)

# 5. Gallery
gallery_imgs = [
    'GALERIA DE FOTOS/WhatsApp Image 2026-08-03 at 07.41.28.jpeg',
    'GALERIA DE FOTOS/WhatsApp Image 2026-08-03 at 07.41.29 (1).jpeg',
    'GALERIA DE FOTOS/WhatsApp Image 2026-08-03 at 07.41.29 (2).jpeg',
    'GALERIA DE FOTOS/WhatsApp Image 2026-08-03 at 07.41.29 (3).jpeg',
    'GALERIA DE FOTOS/WhatsApp Image 2026-08-03 at 07.41.29.jpeg',
    'GALERIA DE FOTOS/WhatsApp Image 2026-08-03 at 07.41.30 (1).jpeg',
    'GALERIA DE FOTOS/WhatsApp Image 2026-08-03 at 07.41.30 (2).jpeg'
]
gallery_html = ''
for i, img in enumerate(gallery_imgs):
    gallery_html += f'<div class="ph" style="aspect-ratio: 1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);"><img src="{img}" alt="Foto {i+1}" style="width:100%; height:100%; object-fit:cover;"></div>\n'

html = re.sub(
    r'<div class="gallery reveal">\s*<!--.*?-->\s*<div class="ph">.*?</div>\s*<div class="ph">.*?</div>\s*<div class="ph">.*?</div>\s*<div class="ph">.*?</div>\s*<div class="ph">.*?</div>\s*<div class="ph">.*?</div>\s*</div>',
    f'<div class="gallery reveal" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">\n{gallery_html}</div>',
    html, flags=re.DOTALL
)
html = re.sub(
    r'<div class="gallery reveal">.*?</div>\s*(?=</section>|</div>)',
    f'<div class="gallery reveal" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">\n{gallery_html}</div>',
    html, flags=re.DOTALL
)

# 6. Update Prices based on the new image
prices_section = """
        <p class="lead reveal">Tarjetas:</p>
        <div class="gift-options reveal" style="margin-top: 1rem; text-align: center;">
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text);">Mayores: <strong>$61.900</strong></p>
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text);">6 a 12 años: <strong>$43.500</strong></p>
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text);">2 a 5 años: <strong>$23.600</strong></p>
            <p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text);">Trasnoche: <strong>$33.000</strong></p>
            <p style="font-size: 0.9rem; margin-top: 1rem; color: var(--text-muted); font-style: italic;">* Precios vigentes junio y julio</p>
            <p style="font-family: 'Great Vibes', cursive; font-size: 2.5rem; color: var(--gold); margin-top: 1.5rem;">Gracias</p>
        </div>
"""
# Assuming the template has a gifts section, let's inject this into a generic place or replace the gift text
# The template probably has an "openGiftsBtn" or a section. Let's find "Ver datos de pago" or "Regalos"
html = re.sub(
    r'<button type="button" class="btn btn-outline btn-full" id="openGiftsBtn">.*?Ver datos de pago / regalos.*?</button>',
    prices_section,
    html, flags=re.DOTALL
)

# 7. Formulario (Google Sheets style)
form_html = """
<div class="btn-row reveal" style="display:flex; flex-direction:column; gap:15px; margin-top:20px; text-align:left; background: rgba(255,255,255,0.7); padding: 25px; border-radius:15px; border: 1px solid var(--line); box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
    <form id="rsvpForm" style="width: 100%;">
        <div style="margin-bottom: 15px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; color:var(--text); text-transform:uppercase; letter-spacing:1px; font-weight:600;">Nombre y Apellido</label>
            <input type="text" name="nombre" required style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--line); background:white; color:var(--text); font-family:var(--font-body);">
        </div>
        <div style="margin-bottom: 15px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; color:var(--text); text-transform:uppercase; letter-spacing:1px; font-weight:600;">¿Asistirás?</label>
            <div style="display:flex; gap:15px;">
                <label style="font-size:14px; cursor:pointer;"><input type="radio" name="asistencia" value="Si" checked style="margin-right:5px; accent-color:var(--gold);"> Sí, estaré ahí</label>
                <label style="font-size:14px; cursor:pointer;"><input type="radio" name="asistencia" value="No" style="margin-right:5px; accent-color:var(--gold);"> No podré</label>
            </div>
        </div>
        <div style="margin-bottom: 15px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; color:var(--text); text-transform:uppercase; letter-spacing:1px; font-weight:600;">Acompañantes</label>
            <input type="number" name="acompanantes" min="0" max="10" placeholder="0" required style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--line); background:white; color:var(--text); font-family:var(--font-body);">
        </div>
        <div style="margin-bottom: 15px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; color:var(--text); text-transform:uppercase; letter-spacing:1px; font-weight:600;">Mensaje</label>
            <textarea name="mensaje" rows="3" style="width:100%; padding:12px; border-radius:8px; border:1px solid var(--line); background:white; color:var(--text); font-family:var(--font-body);"></textarea>
        </div>
        <button type="submit" class="btn btn-full" id="submitBtn" style="background-color:var(--gold); color:white; border:none; width:100%; padding:15px; font-weight:bold; cursor:pointer; border-radius:30px; letter-spacing: 1px; text-transform: uppercase;">
            <span id="btnText">Enviar Confirmación</span>
            <div id="btnLoader" style="display:none; text-align:center;">Enviando...</div>
        </button>
    </form>
    <div id="successMessage" style="display:none; color:var(--success); font-weight:bold; text-align:center; padding-top:10px;">¡Gracias! Confirmación enviada con éxito.</div>
</div>

<script>
    document.getElementById('rsvpForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = document.getElementById('rsvpForm');
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        const btn = document.getElementById('submitBtn');
        const success = document.getElementById('successMessage');
        
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        btn.disabled = true;

        setTimeout(() => {
            form.style.display = 'none';
            success.style.display = 'block';
        }, 1500);
    });
</script>
"""

# Replace WhatsApp section with the new Formulario
html = re.sub(
    r'<a class="btn btn-wa btn-full".*?Confirmar por WhatsApp\s*</a>',
    form_html,
    html, flags=re.DOTALL
)

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Proceso completado con éxito.")
