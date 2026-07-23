const fs = require('fs');
let p = 'c:/Users/germa/Downloads/demos/invitaciones-digitales/src/app/page.tsx';
let f = fs.readFileSync(p, 'utf8');

f = f.replace(/<nav\s+className={`fixed top-0/g, '<div className="fixed top-0 inset-x-0 h-9 bg-terracotta-600 text-white z-[60] flex items-center justify-center text-[13px] font-medium tracking-wide shadow-sm">🎁 30% OFF abonando por transferencia</div>\\n      <nav\\n        className={`fixed top-9');
f = f.replace(/<header className="relative pt-24/g, '<header className="relative pt-32');

fs.writeFileSync(p, f);
console.log("Done!");
