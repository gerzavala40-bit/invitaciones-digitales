const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir);
const demoFiles = files.filter(f => f.startsWith('demo-') && f.endsWith('.html'));

const footerToInject = `
  <!-- Contacto / Demo Info (Injected) -->
  <style>
    .contacto-footer-wrap {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      max-width: 1000px;
      margin: 0 auto;
    }
    .contacto-col { flex: 1; }
    @media (min-width: 768px) {
      .contacto-footer-wrap {
        flex-direction: row;
        justify-content: space-between;
      }
    }
    .contacto-footer h5 {
      font-family: inherit;
      font-size: 1.1rem;
      font-weight: 400;
      letter-spacing: 2px;
      margin-bottom: 20px;
      color: #222;
      text-transform: uppercase;
    }
    .contacto-footer p {
      font-size: 0.95rem;
      font-weight: 300;
      color: #666;
      margin-bottom: 25px;
      line-height: 1.8;
    }
    .contacto-footer ul {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 0.95rem;
      font-weight: 300;
      color: #555;
      line-height: 2.2;
    }
    .contacto-footer a { color: #61ce70; text-decoration: none; font-weight: 400; }
  </style>
  <section class="contacto-footer" style="padding: 80px 20px; background: #ffffff; color: #333; border-top: 1px solid #eaeaea; text-align: left;">
    <div class="contacto-footer-wrap">
      <div class="contacto-col">
        <h5>¿Te gustó la invitación?</h5>
        <p>¡Contactate y pedí la tuya!</p>
        <ul>
          <li><i class="fab fa-whatsapp" style="color: #61ce70; width: 30px; text-align: center;"></i> <a href="#">¡Envianos un Whatsapp!</a></li>
          <li><i class="fas fa-phone-alt" style="color: #333; width: 30px; text-align: center;"></i> +549 351 8754822 | +549 351 8115010</li>
          <li><i class="fas fa-envelope" style="color: #333; width: 30px; text-align: center;"></i> agendalafecha@gmail.com</li>
        </ul>
      </div>
      <div class="contacto-col">
        <h5>Seguinos en Instagram</h5>
        <p>Para ver ejemplos de nuestro trabajo y enterarte de todas nuestras novedades.</p>
        <ul>
          <li><i class="fab fa-instagram" style="color: #555; width: 30px; text-align: center; font-size: 1.2rem;"></i> <a href="https://instagram.com/agendalafecha">agendalafecha</a></li>
        </ul>
      </div>
    </div>
  </section>
`;

demoFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to remove the old injected footer (everything from <!-- Contacto / Demo Info (Injected) --> up to the next section or footer comment)
  const regex = /<!-- Contacto \/ Demo Info \(Injected\) -->[\s\S]*?(?=<!-- Footer -->|<footer)/;
  
  if (regex.test(content)) {
    content = content.replace(regex, footerToInject + '\n  ');
  } else {
    // If not found for some reason, inject it before Footer
    if (content.includes('<!-- Footer -->')) {
      content = content.replace(/<!-- Footer -->/i, footerToInject + '\n  <!-- Footer -->');
    } else if (content.includes('<footer')) {
      content = content.replace(/<footer/i, footerToInject + '\n  <footer');
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed:', file);
});

console.log('All footers fixed successfully.');
