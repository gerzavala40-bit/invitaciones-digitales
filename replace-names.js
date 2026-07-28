const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'demo-boda-elegante-oscuro.html');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/Valentina & Matías/g, 'Sofía & Felipe');
content = content.replace(/Valentina &amp; Matías/g, 'Sofía &amp; Felipe');
content = content.replace(/Valentina<span class="amp">&amp;<\/span>Matías/g, 'Sofía<span class="amp">&amp;</span>Felipe');
content = content.replace(/valentina\.matias\.boda/g, 'sofia.felipe.boda');
content = content.replace(/Valentina<span/g, 'Sofía<span'); // Just in case
content = content.replace(/<\/span>Matías/g, '</span>Felipe'); // Just in case

fs.writeFileSync(filePath, content, 'utf8');
console.log('Names replaced');
