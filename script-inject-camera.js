const fs = require('fs');
const path = require('path');

const publicDir = 'c:/Users/germa/Downloads/demos/invitaciones-digitales/public';
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const floatingCameraHtml = `
  <!-- Muro Social Floating Button -->
  <a href="/demo-wall/upload" target="_blank" style="position: fixed; bottom: 90px; right: 20px; z-index: 999; display: flex; align-items: center; justify-content: center; width: 56px; height: 56px; background-color: var(--primary, #d4af37); border-radius: 50%; box-shadow: 0 4px 20px rgba(0,0,0,0.3); color: #fff; text-decoration: none; transition: transform 0.3s; animation: pulseCamera 2s infinite;">
    <svg style="width: 26px; height: 26px;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    <div style="position: absolute; right: 65px; background: rgba(0,0,0,0.8); color: white; padding: 4px 10px; border-radius: 20px; font-size: 12px; white-space: nowrap; pointer-events: none; opacity: 0.9;">📸 ¡Subí tus fotos!</div>
  </a>
  <style>
    @keyframes pulseCamera {
      0% { transform: scale(1); box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
      50% { transform: scale(1.05); box-shadow: 0 4px 25px var(--primary, rgba(212,175,55,0.6)); }
      100% { transform: scale(1); box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
    }
  </style>
`;

let injectedCount = 0;

for (const file of files) {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('Muro Social Floating Button')) {
    // Inject right before </body>
    content = content.replace('</body>', floatingCameraHtml + '\\n</body>');
    fs.writeFileSync(filePath, content);
    injectedCount++;
  }
}

console.log('Injected in ' + injectedCount + ' files.');
