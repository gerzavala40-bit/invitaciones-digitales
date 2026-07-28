const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const covers = {
  // New Canva Covers from user
  'demo-bautismo-benicio.html': 'portada-bautismo.png',
  'demo-boda-floral-claro.html': 'portada-boda-claro.png',
  'demo-canva-boho.html': 'portada-boho.png',
  'demo-boda-noche-dorada.html': 'portada-noche-dorada.png',
  
  // High-quality Unsplash backgrounds for the rest
  'demo-babyshower-malena.html': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1920&q=80',
  'demo-corporativo-gala.html': 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80',
  'demo-cumple-minimalista.html': 'https://images.unsplash.com/photo-1530103862676-de8892b12a15?auto=format&fit=crop&w=1920&q=80'
};

Object.keys(covers).forEach(file => {
  const filePath = path.join(publicDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const bgImage = covers[file];

    // Build the new CSS block for splash-screen
    const newCss = `
    .splash-screen {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background-color: #fafafa;
      background-image: url('${bgImage}');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 12vh;
      transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s ease 0.7s;
    }
    @media (min-width: 768px) {
      .splash-screen {
        background-size: contain;
      }
    }`;

    // Regex to find the existing .splash-screen block and replace it
    const regex = /\.splash-screen\s*\{[\s\S]*?transition:[^;]+;\s*\}(?:\s*@media\s*\([^)]+\)\s*\{\s*\.splash-screen\s*\{[^}]+\}\s*\})?/i;
    
    if (regex.test(content)) {
      content = content.replace(regex, newCss.trim());
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Applied cover to:', file);
    }
  }
});
