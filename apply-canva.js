const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const canvaCovers = {
  'demo-boda-premium.html': 'boda-floral.png',
  'demo-boda-elegante-oscuro.html': 'portada-boda-elegante.png',
  'demo-15-camila-glam.html': 'portada-15.png'
};

Object.keys(canvaCovers).forEach(file => {
  const filePath = path.join(publicDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const bgImage = canvaCovers[file];

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
    const regex = /\.splash-screen\s*\{[\s\S]*?transition:[^;]+;\s*\}/i;
    
    if (regex.test(content)) {
      content = content.replace(regex, newCss.trim());
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Applied Canva cover to:', file);
    }
  }
});
