
import re

with open("public/demo-boda-elegante-oscuro.html", "r", encoding="utf-8") as f:
    html = f.read()

pattern = re.compile(r'<section class="contacto-footer"[^>]*>.*?</section>', re.DOTALL)

replacement = """<section class="contacto-footer" style="padding: 60px 20px; background: var(--ink); color: var(--muted); border-top: 1px solid var(--line); text-align: center;">
    <div class="contacto-footer-wrap" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
      <h5 style="color: var(--gold); font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 500;">¿Te gustó la invitación?</h5>
      <ul style="display: flex; gap: 30px; justify-content: center; list-style: none; padding: 0; margin: 0;">
        <li><a href="https://instagram.com/teinvitoapp" style="color: var(--cream); text-decoration: none; display: flex; align-items: center; gap: 8px; font-family: 'Jost', sans-serif; font-size: 15px;"><i class="fab fa-instagram" style="color: var(--gold); font-size: 1.2rem;"></i> @teinvitoapp</a></li>
        <li><a href="https://teinvitoapp.com.ar" style="color: var(--cream); text-decoration: none; display: flex; align-items: center; gap: 8px; font-family: 'Jost', sans-serif; font-size: 15px;"><i class="fas fa-globe" style="color: var(--gold); font-size: 1.2rem;"></i> Sitio Web</a></li>
      </ul>
    </div>
  </section>"""

new_html = pattern.sub(replacement, html)

with open("public/demo-boda-elegante-oscuro.html", "w", encoding="utf-8") as f:
    f.write(new_html)

print("Footer updated")

