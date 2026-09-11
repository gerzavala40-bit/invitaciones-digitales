const fs = require('fs');
const file = 'c:/Users/germa/Downloads/demos/DISEÑOS DE TARJETAS/demo-canva-boho.html';
let html = fs.readFileSync(file, 'utf8');

const heroRegex = /<div class="wrap reveal">[\s\S]*?<div class="countdown">/;
const newHero = `<div class="wrap reveal canva-boho-hero">
      <div class="canva-boho-photo-wrapper">
        <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop" alt="Pareja" class="canva-boho-photo" />
      </div>
      <div class="canva-boho-script">¡Nos casamos!</div>
      <h1 class="canva-boho-title">Olivia Y Lucas</h1>
      
      <p class="hero-date" style="font-size: 0.9rem; font-weight: 600; color: var(--text); margin-top: 1rem;">| 14 de febrero de 2027 | 21 hs |</p>
      <p class="lead" style="font-size: 0.85rem; color: var(--text);">Los esperamos con muchas ganas de divertirse en:<br>Calle Cualquiera 123, Cualquier Lugar</p>
      
      <div class="countdown">`;

html = html.replace(heroRegex, newHero);
fs.writeFileSync(file, html);
