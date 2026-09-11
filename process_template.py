import os
import re

template_path = r'C:\Users\germa\Downloads\demos\DISEÑOS DE TARJETAS\demo-15-camila-glam.html'
output_path = r'C:\Users\germa\Downloads\demos\invitacion_camila_final.html'

with open(template_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Background image (translucent)
bg_img = 'FOTO TRASLUCIDA DE FONDO/WhatsApp Image 2026-08-03 at 07.41.28.jpeg'
html = html.replace('background: var(--bg);', f'background: linear-gradient(rgba(3, 19, 38, 0.85), rgba(3, 19, 38, 0.85)), url("{bg_img}") center/cover fixed;')

# 2. Circular Photo
round_img = 'FOTO REDONDA/WhatsApp Image 2026-08-03 at 07.41.30.jpeg'
html = re.sub(
    r'<div style="width: 100%; max-height: 55vh; overflow: hidden; margin-bottom: 2rem;">\s*<img src="descarga \(5\)\.webp" alt="Portada Camila" style=".*? display: block;" />\s*</div>',
    f'<div style="width: 250px; height: 250px; overflow: hidden; margin: 0 auto 2rem auto; border-radius: 50%; border: 4px solid var(--gold); box-shadow: 0 0 20px rgba(194, 168, 120, 0.5);"><img src="{round_img}" alt="Portada Camila" style="width: 100%; height: 100%; object-fit: cover; display: block;" /></div>',
    html, flags=re.DOTALL
)

# 3. Gallery
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
    gallery_html += f'<div class="ph" style="aspect-ratio: 1; border-radius: 8px; overflow: hidden;"><img src="{img}" alt="Foto {i+1}" style="width:100%; height:100%; object-fit:cover;"></div>\n'

html = re.sub(
    r'<div class="gallery reveal">\s*<!--.*?-->\s*<div class="ph">.*?</div>\s*<div class="ph">.*?</div>\s*<div class="ph">.*?</div>\s*<div class="ph">.*?</div>\s*<div class="ph">.*?</div>\s*<div class="ph">.*?</div>\s*</div>',
    f'<div class="gallery reveal" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">\n{gallery_html}</div>',
    html, flags=re.DOTALL
)
# In case the template only had a few placeholders like in the grep output (Foto 1, Foto 2)
html = re.sub(
    r'<div class="gallery reveal">.*?</div>\s*(?=</section>|</div>)',
    f'<div class="gallery reveal" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">\n{gallery_html}</div>',
    html, flags=re.DOTALL
)


# 4. Formulario (Google Sheets style)
form_html = """
<div class="btn-row reveal" style="display:flex; flex-direction:column; gap:15px; margin-top:20px; text-align:left; background: rgba(255,255,255,0.05); padding: 25px; border-radius:15px; border: 1px solid var(--line);">
    <form id="rsvpForm" style="width: 100%;">
        <div style="margin-bottom: 15px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; color:var(--gold); text-transform:uppercase; letter-spacing:1px;">Nombre y Apellido</label>
            <input type="text" name="nombre" required style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--line); background:rgba(0,0,0,0.2); color:white;">
        </div>
        <div style="margin-bottom: 15px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; color:var(--gold); text-transform:uppercase; letter-spacing:1px;">¿Asistirás?</label>
            <div style="display:flex; gap:15px;">
                <label style="font-size:14px; cursor:pointer;"><input type="radio" name="asistencia" value="Si" checked style="margin-right:5px; accent-color:var(--gold);"> Sí, estaré ahí</label>
                <label style="font-size:14px; cursor:pointer;"><input type="radio" name="asistencia" value="No" style="margin-right:5px; accent-color:var(--gold);"> No podré</label>
            </div>
        </div>
        <div style="margin-bottom: 15px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; color:var(--gold); text-transform:uppercase; letter-spacing:1px;">Acompañantes</label>
            <input type="number" name="acompanantes" min="0" max="10" placeholder="0" required style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--line); background:rgba(0,0,0,0.2); color:white;">
        </div>
        <div style="margin-bottom: 15px;">
            <label style="display:block; margin-bottom:5px; font-size:12px; color:var(--gold); text-transform:uppercase; letter-spacing:1px;">Mensaje</label>
            <textarea name="mensaje" rows="3" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--line); background:rgba(0,0,0,0.2); color:white;"></textarea>
        </div>
        <button type="submit" class="btn btn-full" id="submitBtn" style="background-color:var(--gold); color:var(--bg); border:none; width:100%; padding:12px; font-weight:bold; cursor:pointer;">
            <span id="btnText">Enviar Confirmación</span>
            <div id="btnLoader" style="display:none;">Enviando...</div>
        </button>
    </form>
    <div id="successMessage" style="display:none; color:var(--success); font-weight:bold; text-align:center;">¡Gracias! Confirmación enviada con éxito.</div>
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
        
        // CÓDIGO PARA CONECTAR A GOOGLE SHEETS
        /*
        const scriptURL = 'TU_URL_DE_APPS_SCRIPT';
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                form.style.display = 'none';
                success.style.display = 'block';
            })
            .catch(error => alert('Error al enviar. Intenta de nuevo.'));
        */
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
