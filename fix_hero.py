
import re

with open("public/demo-boda-elegante-oscuro.html", "r", encoding="utf-8") as f:
    html = f.read()

# Remove monogram HTML
html = html.replace('<div class="monogram">V&amp;M</div>', "")

# Update hero CSS
html = html.replace(
    ".hero{ min-height:100svh; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; padding:40px 28px; }",
    ".hero{ \n    min-height:100svh; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; padding:40px 28px; \n    background-image: linear-gradient(to bottom, rgba(16, 13, 10, 0.4) 0%, rgba(16, 13, 10, 0.6) 75%, var(--ink) 100%), url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80');\n    background-size: cover;\n    background-position: center;\n  }"
)

# Enhance h1 text shadow
html = html.replace(
    ".hero h1{ font-size:clamp(46px,11vw,84px); font-style:italic; line-height:1.05; margin-bottom:10px; }",
    ".hero h1{ font-size:clamp(46px,11vw,84px); font-style:italic; line-height:1.05; margin-bottom:10px; text-shadow: 0 4px 20px rgba(0,0,0,0.9); }"
)

# Enhance date text shadow
html = html.replace(
    ".hero .date{ font-size:14px; letter-spacing:0.15em; color:var(--muted); text-transform:uppercase; margin-top:20px; }",
    ".hero .date{ font-size:14px; letter-spacing:0.15em; color:var(--muted); text-transform:uppercase; margin-top:20px; text-shadow: 0 2px 10px rgba(0,0,0,0.9); }"
)

# Enhance eyebrow text shadow (adding a new rule)
html = html.replace(
    ".eyebrow{ font-size:11px; text-transform:uppercase; letter-spacing:0.3em; color:var(--gold); margin-bottom:16px; }",
    ".eyebrow{ font-size:11px; text-transform:uppercase; letter-spacing:0.3em; color:var(--gold); margin-bottom:16px; text-shadow: 0 2px 10px rgba(0,0,0,0.9); }"
)

with open("public/demo-boda-elegante-oscuro.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Done")

