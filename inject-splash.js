const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir);
// Skip demo-boda-premium.html as it is already updated, though we can safely skip if we check for the code
const demoFiles = files.filter(f => f.startsWith('demo-') && f.endsWith('.html'));

const cssToInject = `
  <!-- SPLASH SCREEN CSS -->
  <style>
    body.locked {
      overflow: hidden;
      height: 100vh;
    }
    .splash-screen {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background-color: #fafafa;
      background-image: url('boda-floral.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 12vh;
      transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s ease 0.7s;
    }
    .splash-screen.slide-up {
      transform: translateY(-100%);
      opacity: 0;
      pointer-events: none;
    }
    .splash-content {
      text-align: center;
      animation: fadeIn 2s ease forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .btn-abrir {
      background: rgba(255, 255, 255, 0.95);
      color: #333;
      border: 1px solid #555;
      padding: 15px 40px;
      font-size: 0.85rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Montserrat', sans-serif;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      margin-bottom: 15px;
    }
    .btn-abrir:hover {
      background: #fff;
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }
    .splash-hint {
      color: #666;
      font-size: 0.85rem;
      letter-spacing: 1px;
      margin: 0;
    }
  </style>
</head>
`;

const htmlToInject = `
<body class="locked">
  
  <!-- SPLASH SCREEN ENVELOPE -->
  <div id="splashScreen" class="splash-screen">
    <div class="splash-content">
      <button id="btnOpenInvite" class="btn-abrir">ABRIR INVITACIÓN</button>
      <p class="splash-hint">Tocá para entrar</p>
    </div>
  </div>
`;

demoFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Prevent double injection
  if (!content.includes('SPLASH SCREEN CSS')) {
    
    // Inject CSS
    content = content.replace(/<\/head>/i, cssToInject);
    
    // Inject HTML
    content = content.replace(/<body>/i, htmlToInject);

    // Inject JS logic for splash screen right before </body>
    // Many templates might not have the audio button logic, so we inject a safe generic logic
    const jsToInject = `
  <script>
    // Injected Splash Screen Logic
    document.addEventListener("DOMContentLoaded", function() {
      const btnOpen = document.getElementById('btnOpenInvite');
      if(btnOpen) {
        btnOpen.addEventListener('click', () => {
          document.getElementById('splashScreen').classList.add('slide-up');
          document.body.classList.remove('locked');
          
          // Auto-play music if exists
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
            // If the template uses isPlaying variable, we can't easily sync it here without breaking scope,
            // but calling play() ensures it starts.
          }
        });
      }
    });
  </script>
</body>`;
    
    content = content.replace(/<\/body>/i, jsToInject);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated splash screen in:', file);
  }
});

console.log('All splash screens applied successfully.');
