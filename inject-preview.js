const fs = require('fs');
const path = require('path');

const demos = [
    'demo-boda-noche-dorada.html',
    'demo-boda-floral-claro.html',
    'demo-cumple-minimalista.html',
    'demo-15-camila-glam.html',
    'demo-bautismo-benicio.html',
    'demo-corporativo-gala.html',
    'demo-canva-boho.html',
    'demo-babyshower-malena.html'
]; 

const injection = `
<script>
  if (window.location.search.includes('preview=1')) {
    document.addEventListener('DOMContentLoaded', () => {
      const audio = document.getElementById('bgMusic');
      if (audio) {
        audio.pause();
        audio.remove();
      }
      const musicBtn = document.querySelector('.music-btn');
      if (musicBtn) {
        musicBtn.style.display = 'none';
      }
    });
  }
</script>
</body>`;

for (let file of demos) { 
    const p = path.join('c:/Users/germa/Downloads/demos/invitaciones-digitales/public', file);
    if (!fs.existsSync(p)) continue;
    
    let html = fs.readFileSync(p, 'utf8'); 
    
    // Only inject if it's not already there
    if (!html.includes('preview=1')) {
        html = html.replace('</body>', injection); 
        fs.writeFileSync(p, html); 
        console.log('Injected preview logic into ' + file);
    } else {
        console.log('Already injected in ' + file);
    }
}
