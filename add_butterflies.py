import re

file_path = r'C:\Users\germa\Downloads\demos\invitacion_clari_final.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# CSS de mariposas
css_butterflies = """
    /* Mariposas Volando */
    .butterflies {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none;
      overflow: hidden;
      z-index: 10;
    }
    .bf {
      position: absolute;
      width: 50px;
      height: 50px;
      /* SVG de Mariposa */
      background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="%236ba4d8" d="M12,2c-0.6,0-1,0.4-1,1v1.3C8.6,4.8,6.8,6,6,7.5C5.2,6,3.4,4.8,1,4.3V3c0-0.6-0.4-1-1-1S-1,2.4-1,3v18c0,0.6,0.4,1,1,1s1-0.4,1-1v-1.3 c2.4-0.5,4.2-1.7,5-3.2c0.8,1.5,2.6,2.7,5,3.2V21c0,0.6,0.4,1,1,1s1-0.4,1-1V3C13,2.4,12.6,2,12,2z" opacity="0.6" transform="translate(6,0) scale(0.9)"/><path fill="%231a4a75" d="M11.5,12c-0.3,0-0.5-0.2-0.5-0.5v-10C11,1.2,11.2,1,11.5,1S12,1.2,12,1.5v10C12,11.8,11.8,12,11.5,12z" transform="translate(0.5,0)"/></svg>');
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0;
    }
    .bf1 { animation: flyLR 16s linear infinite; top: 15%; left: -20%; transform: scale(0.9); }
    .bf2 { animation: flyLR 22s linear infinite 5s; top: 45%; left: -20%; transform: scale(1.2); }
    .bf3 { animation: flyRL 18s linear infinite 2s; top: 25%; right: -20%; transform: scale(0.8); }
    .bf4 { animation: flyRL 24s linear infinite 8s; top: 65%; right: -20%; transform: scale(1); }

    @keyframes flyLR {
      0% { transform: translate(0, 0) rotate(15deg); opacity: 0; }
      10% { opacity: 0.8; }
      50% { transform: translate(60vw, -40px) rotate(-10deg); }
      90% { opacity: 0.8; }
      100% { transform: translate(120vw, -80px) rotate(15deg); opacity: 0; }
    }
    @keyframes flyRL {
      0% { transform: translate(0, 0) scaleX(-1) rotate(15deg); opacity: 0; }
      10% { opacity: 0.8; }
      50% { transform: translate(-60vw, -30px) scaleX(-1) rotate(-5deg); }
      90% { opacity: 0.8; }
      100% { transform: translate(-120vw, -60px) scaleX(-1) rotate(15deg); opacity: 0; }
    }
    /* Fin Mariposas */
"""

html = html.replace('/* ---------- SPLASH / BIENVENIDA ---------- */', css_butterflies + '\n    /* ---------- SPLASH / BIENVENIDA ---------- */')

# HTML de mariposas
html_butterflies = """
      <div class="butterflies">
        <div class="bf bf1"></div>
        <div class="bf bf2"></div>
        <div class="bf bf3"></div>
        <div class="bf bf4"></div>
      </div>
"""

# Insertar dentro de hero
html = re.sub(
    r'(<section class="section hero".*?>)',
    r'\1' + html_butterflies,
    html, count=1
)

# Fix SVG of butterfly (use a nicer path)
nice_butterfly = """<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="%236ba4d8" d="M22 6c-1.5-1.5-3.8-1.7-5.5-.3l-3.5 2.6c-1.6-1.5-4-1.2-5.4.5L2.3 15C1 16.5.8 18.7 2 20.3c1.2 1.6 3.4 1.9 4.9.8l4.4-3.3c.7 2.1 2.8 3.3 5 2.6 2.3-.7 3.5-3.1 2.6-5.3l3.3-4.4C23.7 9.4 23.4 7.2 22 6z" opacity="0.6"/></svg>"""

html = html.replace("""<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="%236ba4d8" d="M12,2c-0.6,0-1,0.4-1,1v1.3C8.6,4.8,6.8,6,6,7.5C5.2,6,3.4,4.8,1,4.3V3c0-0.6-0.4-1-1-1S-1,2.4-1,3v18c0,0.6,0.4,1,1,1s1-0.4,1-1v-1.3 c2.4-0.5,4.2-1.7,5-3.2c0.8,1.5,2.6,2.7,5,3.2V21c0,0.6,0.4,1,1,1s1-0.4,1-1V3C13,2.4,12.6,2,12,2z" opacity="0.6" transform="translate(6,0) scale(0.9)"/><path fill="%231a4a75" d="M11.5,12c-0.3,0-0.5-0.2-0.5-0.5v-10C11,1.2,11.2,1,11.5,1S12,1.2,12,1.5v10C12,11.8,11.8,12,11.5,12z" transform="translate(0.5,0)"/></svg>""", nice_butterfly)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Mariposas agregadas!")
