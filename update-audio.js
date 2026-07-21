const fs = require('fs');
const path = require('path');

const demos = { 
    'demo-boda-noche-dorada.html': 'bon-jovi.mp3', 
    'demo-boda-floral-claro.html': 'carin-leon.mp3', 
    'demo-cumple-minimalista.html': 'se-menea.mp3', 
    'demo-15-camila-glam.html': 'bad-bunny.mp3', 
    'demo-bautismo-benicio.html': 'camila.mp3', 
    'demo-corporativo-gala.html': 'bruno-mars.mp3' 
}; 

for (let [file, song] of Object.entries(demos)) { 
    const p = path.join('c:/Users/germa/Downloads/demos/invitaciones-digitales/public', file);
    let html = fs.readFileSync(p, 'utf8'); 
    
    // Replace the inner HTML of the <audio> tag
    html = html.replace(/<audio id="bgMusic"[^>]*>[\s\S]*?<\/audio>/g, 
        `<audio id="bgMusic" loop preload="auto" playsinline webkit-playsinline>\n    <source src="/${song}" type="audio/mpeg" />\n  </audio>`
    ); 
    
    fs.writeFileSync(p, html); 
    console.log('Updated ' + file);
}
