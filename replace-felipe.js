const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'demo-boda-noche-dorada.html');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/Sofía & Tomás/g, 'Sofía & Felipe');
content = content.replace(/Sofía &amp; Tomás/g, 'Sofía &amp; Felipe');
content = content.replace(/S&T/g, 'S&F');
content = content.replace(/S&amp;T/g, 'S&amp;F');
content = content.replace(/Tomás/g, 'Felipe');
content = content.replace(/Toms/g, 'Felipe'); // handle possible encoding issues

fs.writeFileSync(filePath, content, 'utf8');
console.log('Names replaced in demo-boda-noche-dorada.html');
