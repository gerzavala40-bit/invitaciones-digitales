const fs = require('fs');
let p = 'invitaciones-digitales/src/app/admin/events/[id]/chat/ChatAdminPanel.tsx';
if (fs.existsSync(p)) {
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/<style jsx global>\{`/g, '<style dangerouslySetInnerHTML={{ __html: `').replace(/`\}<\/style>/g, '` }} />');
  fs.writeFileSync(p, c);
  console.log('Fixed');
} else {
  console.log('File not found');
}
