const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src', 'components', 'templates');

function unescapeUnicode(str) {
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
    return String.fromCharCode(parseInt(grp, 16));
  });
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const unescaped = unescapeUnicode(content);
      if (content !== unescaped) {
        fs.writeFileSync(fullPath, unescaped, 'utf8');
        console.log(`Fixed unicode in: ${file}`);
      }
    }
  }
}

processDirectory(templatesDir);
console.log('Done!');
