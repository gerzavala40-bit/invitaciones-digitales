const fs = require('fs');
let p = 'c:/Users/germa/Downloads/demos/invitaciones-digitales/src/app/page.tsx';
let f = fs.readFileSync(p, 'utf8');

const t1 = `<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-500/20 text-sage-300 text-sm font-semibold border border-sage-500/30">
              30% OFF abonando por transferencia
            </span>`;
            
const r1 = `<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-500/20 text-sage-300 text-sm font-semibold border border-sage-500/30">
                30% OFF abonando por transferencia
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta-500/20 text-terracotta-400 text-sm font-semibold border border-terracotta-500/30 shadow-[0_0_15px_rgba(235,102,74,0.3)] animate-pulse">
                🎁 Muro Social SIN CARGO adicional por este mes
              </span>
            </div>`;

const t2 = `<li className="flex gap-2"><span className="text-gold-400">✓</span> Galería (8 fotos)</li>`;
const r2 = `<li className="flex gap-2"><span className="text-gold-400">✓</span> Música + Galería (8 fotos)</li>
                <li className="flex gap-2 font-bold text-white"><span className="text-terracotta-400">✓</span> Muro Social en Vivo (Gratis)</li>`;

const t3 = `<li className="flex gap-2"><span className="text-sage-400">✓</span> Social Wall (Muro Instagram)</li>`;
const r3 = `<li className="flex gap-2 font-bold text-white"><span className="text-terracotta-400">✓</span> Muro Social en Vivo (Gratis)</li>`;

f = f.replace(t1, r1);
f = f.replace(t2, r2);
f = f.replace(t3, r3);

fs.writeFileSync(p, f);
console.log("Pricing updated");
