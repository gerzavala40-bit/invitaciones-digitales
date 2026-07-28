const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir);
const demoFiles = files.filter(f => f.startsWith('demo-') && f.endsWith('.html'));

demoFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove the Instagram description
  content = content.replace(/<p>Para ver ejemplos de nuestro trabajo y enterarte de todas nuestras novedades\.<\/p>/gi, '');

  // Remove the "Tocá para entrar" hint in the splash screen
  content = content.replace(/<p class="splash-hint">Tocá para entrar<\/p>/gi, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Removed text in:', file);
});

console.log('Done.');
