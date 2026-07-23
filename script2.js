const fs = require('fs');
let p = 'c:/Users/germa/Downloads/demos/invitaciones-digitales/src/app/page.tsx';
let f = fs.readFileSync(p, 'utf8');

const bannerHtml = `      {/* ========== TOP BANNER ========== */}
      <div className="fixed top-0 inset-x-0 h-9 bg-terracotta-600 text-white z-[60] flex items-center justify-center text-[13px] font-medium tracking-wide shadow-sm">
        🎁 30% OFF abonando por transferencia
      </div>

      <nav
        className={\`fixed top-9 `; // Space at the end to match 'fixed top-9 inset-x-0 ...'

f = f.replace(/<nav\s+className={`fixed top-0 /g, bannerHtml);
f = f.replace(/<header className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">/g, '<header className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">');

fs.writeFileSync(p, f);
console.log("Done");
