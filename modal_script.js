const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const modalStart = `
      {/* ========== FORMULARIO (MODAL) ========== */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1a1a]/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#FFF9E0] border-[3px] border-[#1a1a1a] shadow-[8px_8px_0px_#1a1a1a] p-6 sm:p-8 mt-10 mb-10">
            <button 
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-[#FF6B9D] border-[3px] border-[#1a1a1a] flex items-center justify-center font-bold text-white shadow-[3px_3px_0px_#1a1a1a] hover:translate-y-1 hover:shadow-none transition-all"
            >X</button>
`;

const modalEnd = `
          </div>
        </div>
      )}
`;

const startIdx = code.indexOf('{/* ========== FORMULARIO ========== */}');
const endIdx = code.indexOf('{/* ========== FOOTER ========== */}');

if (startIdx !== -1 && endIdx !== -1) {
  let formSection = code.substring(startIdx, endIdx);
  
  // Replace <section id="pedido" ...> with <div id="pedido">
  formSection = formSection.replace(/<section id="pedido"[\s\S]*?<div className="max-w-2xl mx-auto">/, '<div id="pedido" className="w-full">');
  // Since we removed <div max-w-2xl> we need to remove one closing </div> at the end, and the </section>
  const lastSectionClose = formSection.lastIndexOf('</section>');
  if (lastSectionClose !== -1) {
    formSection = formSection.substring(0, lastSectionClose) + formSection.substring(lastSectionClose + '</section>'.length);
  }
  // Remove the wrapper div close too
  const lastDivClose = formSection.lastIndexOf('</div>');
  if (lastDivClose !== -1) {
    formSection = formSection.substring(0, lastDivClose) + formSection.substring(lastDivClose + '</div>'.length);
  }
  
  formSection = formSection.replace('{/* ========== FORMULARIO ========== */}', '');

  code = code.substring(0, startIdx) + modalStart + formSection + modalEnd + code.substring(endIdx);
  fs.writeFileSync('src/app/page.tsx', code);
  console.log('Form modalized!');
} else {
  console.log('Markers not found');
}
