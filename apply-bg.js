const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const backgrounds = {
  'demo-15-camila-glam.html': 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1920&q=80',
  'demo-babyshower-malena.html': 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1920&q=80',
  'demo-bautismo-benicio.html': 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=80',
  'demo-boda-elegante-oscuro.html': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=80',
  'demo-boda-floral-claro.html': 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1920&q=80',
  'demo-boda-noche-dorada.html': 'https://images.unsplash.com/photo-1507676184212-d0330a15183c?auto=format&fit=crop&w=1920&q=80',
  'demo-boda-premium.html': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80',
  'demo-canva-boho.html': 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1920&q=80',
  'demo-corporativo-gala.html': 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80',
  'demo-cumple-minimalista.html': 'https://images.unsplash.com/photo-1530103862676-de8892b12a15?auto=format&fit=crop&w=1920&q=80'
};

const demoFiles = Object.keys(backgrounds);

demoFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const photoUrl = backgrounds[file];

    // Build the new CSS block for splash-screen
    const newCss = `
    .splash-screen {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background-color: #fafafa;
      background-image: 
        url('boda-floral.png'), 
        linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
        url('${photoUrl}');
      background-repeat: no-repeat, no-repeat, no-repeat;
      background-position: center center, center center, center center;
      background-size: contain, cover, cover;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 12vh;
      transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s ease 0.7s;
    }`;

    // Regex to find the existing .splash-screen block and replace it
    const regex = /\.splash-screen\s*\{[\s\S]*?transition:[^;]+;\s*\}/i;
    
    if (regex.test(content)) {
      content = content.replace(regex, newCss.trim());
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Applied background to:', file);
    } else {
      console.log('Could not find .splash-screen CSS in:', file);
    }
  }
});
