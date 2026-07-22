const fs = require('fs');

let f = fs.readFileSync('c:/Users/germa/Downloads/demos/invitaciones-digitales/src/app/page.tsx', 'utf8');

const phoneComp = `
function PhoneMockup({ title, url, desc, selected, onSelect, onPreview }) {
  return (
    <div className={'relative flex flex-col items-center group cursor-pointer transition-transform duration-300 ' + (selected ? 'scale-100' : 'hover:scale-[1.02]')} onClick={onSelect}>
      <div className={'relative w-[260px] h-[520px] bg-black rounded-[38px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] p-[6px] border-4 ' + (selected ? 'border-terracotta-500 ring-4 ring-terracotta-100' : 'border-ink-200')}>
        {/* Dynamic Island */}
        <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[85px] h-[22px] bg-black rounded-b-2xl z-20 flex justify-center pt-1">
          <div className="w-12 h-1.5 rounded-full bg-white/10"></div>
        </div>
        {/* Screen */}
        <div className="relative w-full h-full bg-ink-50 rounded-[30px] overflow-hidden isolate">
          <iframe src={url + '?preview=1'} className="w-[375px] h-[812px] border-none pointer-events-none origin-top-left" style={{ transform: 'scale(0.661)' }} tabIndex={-1} loading="lazy" />
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none"></div>
        </div>
        <div className={'absolute -right-4 -top-4 w-9 h-9 rounded-full bg-terracotta-600 text-white flex items-center justify-center text-xl font-bold shadow-lg transition-opacity ' + (selected ? 'opacity-100' : 'opacity-0')}>✓</div>
      </div>
      <div className="mt-6 text-center px-2 w-full max-w-[260px]">
        <h3 className="font-display text-xl text-ink-900">{title}</h3>
        <p className="text-sm text-ink-400 mt-1">{desc}</p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={(e) => { e.stopPropagation(); onPreview(); }} className="flex-1 flex justify-center items-center h-10 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-ink-200 text-ink-600 hover:bg-ink-50 transition">Ver demo</button>
          <button type="button" className="flex-1 h-10 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-terracotta-600 text-white hover:bg-terracotta-700 transition">Quiero este</button>
        </div>
      </div>
    </div>
  );
}
`;

if(!f.includes('function PhoneMockup')) { 
  f = f.replace('export default function LandingPage() {', phoneComp + '\nexport default function LandingPage() {'); 
}

const demos = [ 
  {title: 'Elegante Oscuro', url: '/demo-boda-noche-dorada.html', desc: 'Bodas de noche · Sofisticado', cat: 'Boda'}, 
  {title: 'Floral Claro', url: '/demo-boda-floral-claro.html', desc: 'Bodas jardín · Romántico', cat: 'Boda'}, 
  {title: 'Minimalista', url: '/demo-cumple-minimalista.html', desc: 'Cumpleaños · Moderno', cat: 'Cumpleaños'}, 
  {title: '15 Años Glam', url: '/demo-15-camila-glam.html', desc: 'Quince · Fucsia y dorado', cat: '15 Años'}, 
  {title: 'Bautismo Tierno', url: '/demo-bautismo-benicio.html', desc: 'Bautismos · Celeste suave', cat: 'Bautismo'}, 
  {title: 'Corporativo', url: '/demo-corporativo-gala.html', desc: 'Eventos de empresa', cat: 'Corporativo'}, 
  {title: 'Boda Boho / Canva', url: '/demo-canva-boho.html', desc: 'Estilo Canva · Tonos crema', cat: 'Boda'} 
]; 

let gridHtml = '<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 justify-items-center" id="styles-grid">\n'; 
demos.forEach(d => { 
  gridHtml += `            <PhoneMockup title="${d.title}" url="${d.url}" desc="${d.desc}" selected={selectedStyle === "${d.title}"} onSelect={() => handleSelectStyle("${d.title}", "${d.cat}")} onPreview={() => window.open("${d.url}", "_blank")} />\n`; 
}); 
gridHtml += '          </div>'; 

f = f.replace(/<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" id="styles-grid">[\s\S]*?<\/div>\s*<p className="text-center mt-10 text-ink-500 text-sm">/, gridHtml + '\n\n          <p className="text-center mt-14 text-ink-500 text-sm">'); 
fs.writeFileSync('c:/Users/germa/Downloads/demos/invitaciones-digitales/src/app/page.tsx', f);
