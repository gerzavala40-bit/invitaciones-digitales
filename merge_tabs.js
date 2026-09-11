const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const premiumFeaturesBlock = `
      {/* ========== FEATURES PREMIUM (TABS) ========== */}
      <section id="premium-features" className="py-12 md:py-24 px-5 bg-white border-t-[3px] border-b-[3px] border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Funciones <span className="inline-block bg-[#FF6B9D] text-white px-3 border-[3px] border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a]">Premium</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setActivePremiumTab('chat')} 
                className={\`px-6 py-3 font-bold border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] transition-all \${activePremiumTab === 'chat' ? 'bg-[#4ECDC4] text-white translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-[#1a1a1a]'}\`}
              >
                💬 Party Chat
              </button>
              <button 
                onClick={() => setActivePremiumTab('cam')} 
                className={\`px-6 py-3 font-bold border-[3px] border-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] transition-all \${activePremiumTab === 'cam' ? 'bg-[#FF8C42] text-white translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-[#1a1a1a]'}\`}
              >
                📸 Party Cam
              </button>
            </div>
          </Reveal>

          {activePremiumTab === 'chat' && (
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <Reveal className="relative">
                <div className="bg-[#1a3a5c] border-[3px] border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0058a8] to-[#3b8dd4] px-4 py-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-white text-sm font-bold">Fiesta de Ana y Pedro</span>
                  </div>
                  <div className="bg-white p-4 space-y-3">
                    <div>
                      <span className="text-xs font-bold text-[#FF6347]">El tio Carlos</span>
                      <p className="text-sm bg-white rounded px-2 py-1">Que grande la novia!! Felicitaciones!!</p>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-[#FF8C00] font-bold bg-[#FFD700]/10 px-3 py-1 rounded-full">Pedro envio un zumbido!</span>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-4">
                  <div className="bg-[#FFF9E0] border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#4ECDC4]">
                    <h3 className="font-bold text-lg flex items-center gap-2">🎫 QR por mesa</h3>
                    <p className="text-sm text-[#666] mt-1">Cada mesa escanea su QR y entra al chat directo, sin instalar nada.</p>
                  </div>
                  <div className="bg-[#FFF9E0] border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#FF6B9D]">
                    <h3 className="font-bold text-lg flex items-center gap-2">💬 Chat general + por mesa</h3>
                    <p className="text-sm text-[#666] mt-1">Un chat para toda la fiesta y otro privado solo para tu mesa.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          )}

          {activePremiumTab === 'cam' && (
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              <Reveal className="relative md:order-2">
                <div className="bg-[#0f0f0f] border-[3px] border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] rounded-xl overflow-hidden">
                  <div className="bg-[#1a1a1a] px-4 py-3 border-b-2 border-[#333] flex justify-between items-center">
                    <span className="text-[#FFF9E0] font-bold tracking-widest text-sm">PARTY CAM LIVE</span>
                    <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div><span className="text-xs text-white">REC</span></div>
                  </div>
                  <div className="p-4 grid grid-cols-3 gap-3">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-gray-200 rounded overflow-hidden relative"><img src={\`/assets/images/15-anos-demo/galeria-\${i}.jpg\`} className="w-full h-full object-cover" alt="" /></div>)}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="md:order-1">
                <div className="space-y-4">
                  <div className="bg-[#FFF9E0] border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#FF8C42]">
                    <h3 className="font-bold text-lg flex items-center gap-2">📸 Muro en vivo</h3>
                    <p className="text-sm text-[#666] mt-1">Tus invitados sacan fotos, las suben y aparecen al instante en la pantalla gigante.</p>
                  </div>
                  <div className="bg-[#FFF9E0] border-[3px] border-[#1a1a1a] p-5 shadow-[4px_4px_0px_#FF6B9D]">
                    <h3 className="font-bold text-lg flex items-center gap-2">📥 Descarga todo</h3>
                    <p className="text-sm text-[#666] mt-1">Al otro día te descargas todas las fotos de los invitados con un clic.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>
`;

const startIdx = code.indexOf('{/* ========== PARTY CHAT');
const endIdx = code.indexOf('{/* ========== PLANES ========== */}');

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + premiumFeaturesBlock + "\n      " + code.substring(endIdx);
  fs.writeFileSync('src/app/page.tsx', code);
  console.log('Tabs merged!');
} else {
  console.log('Could not find markers');
}
