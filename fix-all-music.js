const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir);
const demoFiles = files.filter(f => f.startsWith('demo-') && f.endsWith('.html'));

const fixScript = `
<!-- MUSIC AUTOPLAY FIX -->
<script>
  document.addEventListener("DOMContentLoaded", function() {
    var enterButton = document.getElementById('enterBtn') || document.getElementById('btn-open') || document.getElementById('btnOpenInvite') || document.querySelector('#splash button');
    
    if (enterButton) {
      enterButton.addEventListener('click', function() {
        var bgAudio = document.getElementById('bgAudio') || document.getElementById('bgMusic') || document.getElementById('music');
        if (bgAudio) {
          bgAudio.volume = 0.7;
          bgAudio.play().then(function() {
            var musicBtn = document.getElementById('musicBtn') || document.getElementById('btnMusic');
            if (musicBtn) {
              musicBtn.classList.add('playing');
              var icon = document.getElementById('iconMusic') || musicBtn.querySelector('i');
              if (icon && icon.classList.contains('fa-play')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-music');
              }
              if (typeof window.musicPlaying !== 'undefined') {
                window.musicPlaying = true;
                musicBtn.style.opacity = '1';
                musicBtn.style.transform = 'scale(1.1)';
              }
              if (typeof window.playing !== 'undefined') {
                window.playing = true;
              }
            }
          }).catch(function(e){ console.log("Autoplay prevent: " + e); });
        }
      });
    }
  });
</script>
`;

demoFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Prevent duplicate injections
  if (!content.includes('<!-- MUSIC AUTOPLAY FIX -->')) {
    content = content.replace('</body>', fixScript + '\n</body>');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Injected music fix in:', file);
  } else {
    console.log('Already fixed:', file);
  }
});
