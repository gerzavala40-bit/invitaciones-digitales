const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const files = fs.readdirSync(publicDir);
const demoFiles = files.filter(f => f.startsWith('demo-') && f.endsWith('.html'));

const cssToInject = `
  <!-- START INJECTED HERO BACKGROUND -->
  <style>
    .hero {
      background-image: url('hero_bg_exact.jpg') !important;
      background-size: cover !important;
      background-position: center !important;
      background-attachment: fixed !important;
      position: relative !important;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5); /* Filtro oscuro para resaltar texto */
      z-index: 0;
    }
    .hero > * {
      position: relative;
      z-index: 1;
    }
  </style>
  <!-- END INJECTED HERO BACKGROUND -->
</head>
`;

const footerToInject = `
  <!-- Contacto / Demo Info (Injected) -->
  <section class="contacto-footer" style="padding: 80px 0; background: #ffffff; color: #333; border-top: 1px solid #eaeaea;">
    <div class="container">
      <div class="row text-start justify-content-center">
        <div class="col-md-5 mb-5 mb-md-0">
          <h5 style="font-weight: 400; letter-spacing: 2px; margin-bottom: 20px; color: #222; text-transform: uppercase;">¿Te gustó nuestro demo?</h5>
          <p style="font-weight: 300; color: #666; margin-bottom: 25px; line-height: 1.8;">¡Contactanos! Trabajamos desde Argentina al mundo.</p>
          <ul style="list-style: none; padding: 0; margin: 0; font-weight: 300; color: #555; line-height: 2.2;">
            <li><i class="fab fa-whatsapp" style="color: #61ce70; width: 30px; text-align: center;"></i> <a href="#" style="color: #61ce70; text-decoration: none; font-weight: 400;">¡Envianos un Whatsapp!</a></li>
            <li><i class="fas fa-phone-alt" style="color: #333; width: 30px; text-align: center;"></i> +549 351 8754822 | +549 351 8115010</li>
            <li><i class="fas fa-envelope" style="color: #333; width: 30px; text-align: center;"></i> agendalafecha@gmail.com</li>
          </ul>
        </div>
        <div class="col-md-5 offset-md-1">
          <h5 style="font-weight: 400; letter-spacing: 2px; margin-bottom: 20px; color: #222; text-transform: uppercase;">Seguinos en Instagram</h5>
          <p style="font-weight: 300; color: #666; margin-bottom: 25px; line-height: 1.8;">Para ver ejemplos de nuestro trabajo y enterarte de todas nuestras novedades.</p>
          <ul style="list-style: none; padding: 0; margin: 0; font-weight: 300;">
            <li><i class="fab fa-instagram" style="color: #555; width: 30px; text-align: center; font-size: 1.2rem;"></i> <a href="#" style="color: #61ce70; text-decoration: none; font-weight: 400;">agendalafecha</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
`;

demoFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Prevent double injection
  if (!content.includes('START INJECTED HERO BACKGROUND')) {
    content = content.replace(/<\/head>/i, cssToInject);
  }

  // Prevent double injection of footer
  if (!content.includes('Contacto / Demo Info (Injected)')) {
    // Some use <!-- Footer -->, some use <footer>
    if (content.includes('<!-- Footer -->')) {
      content = content.replace(/<!-- Footer -->/i, footerToInject);
    } else if (content.includes('<footer')) {
      content = content.replace(/<footer/i, footerToInject.replace('<!-- Footer -->', '') + '<footer');
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated:', file);
});

console.log('All files updated successfully.');
