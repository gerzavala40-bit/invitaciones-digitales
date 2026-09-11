const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

code = code.replace(
  'const [isProcessingPayment, setIsProcessingPayment] = useState("");',
  'const [isProcessingPayment, setIsProcessingPayment] = useState("");\n  const [activePremiumTab, setActivePremiumTab] = useState<"chat" | "cam">("chat");\n  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);'
);

code = code.replace(
  '<a href="https://wa.me/5493425299942?text=Hola!%20Quiero%20una%20invitaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-[#1a1a1a] font-bold text-base border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#1a1a1a] transition-all">\n              Hablar por WhatsApp\n            </a>',
  '<button type="button" onClick={() => setIsOrderModalOpen(true)} className="px-8 py-4 bg-white text-[#1a1a1a] font-bold text-base border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#1a1a1a] transition-all cursor-pointer">\n              Hacer pedido manual\n            </button>'
);

fs.writeFileSync('src/app/page.tsx', code);
