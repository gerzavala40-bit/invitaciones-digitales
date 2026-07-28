const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir);
const demoFiles = files.filter(f => f.startsWith('demo-') && f.endsWith('.html'));

demoFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove the injected hero background block completely
  const regex = /<!-- START INJECTED HERO BACKGROUND -->[\s\S]*?<!-- END INJECTED HERO BACKGROUND -->/gi;
  
  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Removed injected hero background from:', file);
  }
});

console.log('Done.');
