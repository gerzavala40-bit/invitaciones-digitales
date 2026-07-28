const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir);
const demoFiles = files.filter(f => f.startsWith('demo-') && f.endsWith('.html'));

demoFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // The new injected script logic
  const newScript = `
  <script>
    // Injected Splash Screen Logic
    document.addEventListener("DOMContentLoaded", function() {
      const btnOpen = document.getElementById('btnOpenInvite');
      if(btnOpen) {
        btnOpen.addEventListener('click', () => {
          document.getElementById('splashScreen').classList.add('slide-up');
          document.body.classList.remove('locked');
          
          // Trigger the template's original splash button if it exists
          const internalBtn = document.getElementById('enterBtn') || document.getElementById('btn-open');
          if (internalBtn) {
             internalBtn.click();
          } else {
            // Fallback for demo-boda-premium
            const audio = document.getElementById('music');
            if (audio) {
              audio.play().catch(e => console.log('Autoplay prevent', e));
              const musicBtn = document.getElementById('btnMusic');
              const musicIcon = document.getElementById('iconMusic');
              if (musicIcon) {
                 musicIcon.classList.remove('fa-play');
                 musicIcon.classList.add('fa-music');
              }
              if (musicBtn) {
                 musicBtn.style.animation = 'pulse-music 2s infinite';
              }
            }
          }
        });
      }
    });
  </script>`;

  // Use regex to replace the existing script block
  const scriptRegex = /<script>\s*\/\/\s*Injected Splash Screen Logic[\s\S]*?<\/script>/i;
  
  if (scriptRegex.test(content)) {
    content = content.replace(scriptRegex, newScript.trim());
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed music script in:', file);
  } else {
    console.log('Could not find injected script in:', file);
  }
});
