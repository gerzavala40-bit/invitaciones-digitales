const fs = require('fs');
let p = 'c:/Users/germa/Downloads/demos/invitaciones-digitales/src/app/page.tsx';
let f = fs.readFileSync(p, 'utf8');

const navOriginal = '<nav\n        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${';
const navNew = '<div className="fixed top-0 inset-x-0 h-9 bg-terracotta-600 text-white z-[60] flex items-center justify-center text-[13px] font-medium tracking-wide shadow-sm">\n        🎁 30% OFF abonando por transferencia\n      </div>\n\n      <nav\n        className={`fixed top-9 inset-x-0 z-50 transition-all duration-300 ${';

if (!f.includes('30% OFF abonando por transferencia')) {
  f = f.replace(navOriginal, navNew);
  f = f.replace('<header className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">', '<header className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">');
  fs.writeFileSync(p, f);
  console.log('Banner added');
} else {
  console.log('Banner already exists');
}
