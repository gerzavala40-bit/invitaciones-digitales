import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CostosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  if (slug !== '15anos-clara' && slug !== 'boda-valentina-y-matias') {
    notFound();
  }

  const isClara = slug === '15anos-clara';
  
  const config = isClara ? {
    title: "Costo de Tarjeta",
    bgUrl: "/clara-bg.jpg",
    disclaimer: "* Precios vigentes agosto y septiembre",
    alias: "PANA.URU.MP",
    holder: "Carabajal Priscila",
    prices: [
      { label: "Mayores", value: "$65.000" },
      { label: "Menores (6 a 12 años)", value: "$45.000" },
      { label: "Niños (2 a 5 años)", value: "$25.000" }
    ]
  } : {
    title: "Valor de Tarjeta",
    bgUrl: "/boda_elegante_bg.jpg",
    disclaimer: "* Confirmar asistencia y pago antes del 1 de Noviembre",
    alias: "sofia.felipe.boda",
    holder: "Alias · Banco Galicia",
    prices: [
      { label: "Invitados Mayores", value: "$75.000" },
      { label: "Menores (6 a 12 años)", value: "$50.000" },
      { label: "Niños (2 a 5 años)", value: "$30.000" }
    ]
  };

  return (
    <main className="min-h-screen py-12 px-4 flex flex-col items-center justify-center" style={{ fontFamily: "var(--font-sans)", background: `url('${config.bgUrl}') center/cover no-repeat fixed`, color: "#ffffff" }}>
      <style>{`
        .clara-costos h2 { font-family: var(--font-display); color: #ffffff; text-transform: uppercase; font-weight: 900; letter-spacing: 0.05em; font-size: 2rem; margin-bottom: 1.5rem; text-shadow: 1px 1px 4px rgba(0,0,0,0.3); }
        .clara-costos .price-card { background: rgba(16, 13, 10, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(201, 166, 107, 0.25); box-shadow: 0 10px 30px rgba(0,0,0,0.5); padding: 2rem; border-radius: 16px; margin-bottom: 2rem; }
        .clara-costos .price-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 1rem 0; }
        .clara-costos .price-row:last-child { border-bottom: none; }
        .clara-costos .price-label { font-weight: 700; color: rgba(255,255,255,0.9); text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; }
        .clara-costos .price-value { font-weight: 900; color: #C9A66B; font-size: 1.25rem; }
        .clara-costos .disclaimer { text-align: center; font-size: 0.75rem; color: #C9A66B; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 1rem; }
        
        .clara-costos .alias-box { background: rgba(0,0,0,0.3); border: 1px solid rgba(201,166,107,0.2); border-radius: 12px; padding: 1.5rem; text-align: center; margin-top: 2rem; }
        .clara-costos .alias-label { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.8); margin-bottom: 0.5rem; font-weight: 700; }
        .clara-costos .alias-value { font-family: var(--font-display); font-size: 1.2rem; color: #C9A66B; font-weight: 900; margin-bottom: 0.35rem; }
        .clara-costos .alias-sub { font-size: 0.8rem; color: rgba(255,255,255,0.9); font-weight: 600; margin-bottom: 0; }
      `}</style>
      
      <div className="w-full max-w-md mx-auto clara-costos">
        <a href={`/${slug}`} className="text-sm underline mb-8 inline-block opacity-90 hover:opacity-100 uppercase tracking-widest font-bold text-white drop-shadow-md text-center w-full">
          ← Volver a la invitación
        </a>
        
        <div className="price-card text-center">
          <h2 style={{ color: "#C9A66B", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>{config.title}</h2>
          
          {config.prices.map((p, idx) => (
            <div key={idx} className="price-row">
              <span className="price-label" style={{ fontFamily: "'Jost', sans-serif" }}>{p.label}</span>
              <span className="price-value">{p.value}</span>
            </div>
          ))}
          
          <p className="disclaimer">{config.disclaimer}</p>

          <div className="alias-box">
            <p className="alias-label">Datos para transferencia</p>
            <p className="alias-value">{config.alias}</p>
            <p className="alias-sub">{config.holder}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
