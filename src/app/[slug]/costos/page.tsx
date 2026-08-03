import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CostosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  if (slug !== '15anos-clara') {
    notFound();
  }

  return (
    <main className="min-h-screen py-12 px-4 flex flex-col items-center justify-center" style={{ fontFamily: "var(--font-sans)", background: "linear-gradient(to bottom, #f4f9fd 0%, #d0e4f5 50%, #9bc2e1 100%)", color: "#01132b" }}>
      <style>{`
        .clara-costos h2 { font-family: var(--font-display); color: #002147; text-transform: uppercase; font-weight: 900; letter-spacing: 0.05em; font-size: 2rem; margin-bottom: 1.5rem; }
        .clara-costos .price-card { background: #ffffff; border: 1px solid var(--line, rgba(0,0,0,0.1)); box-shadow: 0 10px 30px rgba(0,0,0,0.05); padding: 2rem; border-radius: 16px; margin-bottom: 2rem; }
        .clara-costos .price-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,33,71,0.1); padding: 1rem 0; }
        .clara-costos .price-row:last-child { border-bottom: none; }
        .clara-costos .price-label { font-weight: 700; color: #4A5568; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; }
        .clara-costos .price-value { font-weight: 900; color: #002147; font-size: 1.25rem; }
        .clara-costos .disclaimer { text-align: center; font-size: 0.75rem; color: #C4A661; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 1rem; }
        
        .clara-costos .alias-box { background: #f4f9fd; border: 1px solid rgba(0, 33, 71, 0.2); border-radius: 12px; padding: 1.5rem; text-align: center; margin-top: 2rem; }
        .clara-costos .alias-label { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #4A5568; margin-bottom: 0.5rem; font-weight: 700; }
        .clara-costos .alias-value { font-family: var(--font-display); font-size: 1.2rem; color: #002147; font-weight: 900; margin-bottom: 0.35rem; }
        .clara-costos .alias-sub { font-size: 0.8rem; color: #4A5568; font-weight: 600; margin-bottom: 0; }
      `}</style>
      
      <div className="w-full max-w-md mx-auto clara-costos">
        <a href={`/${slug}`} className="text-sm underline mb-8 inline-block opacity-80 hover:opacity-100 uppercase tracking-widest font-bold text-[#002147] text-center w-full">
          ← Volver a la invitación
        </a>
        
        <div className="price-card text-center">
          <h2>Costo de Tarjeta</h2>
          
          <div className="price-row">
            <span className="price-label">Mayores</span>
            <span className="price-value">$65.000</span>
          </div>
          <div className="price-row">
            <span className="price-label">Menores (6 a 12 años)</span>
            <span className="price-value">$45.000</span>
          </div>
          <div className="price-row">
            <span className="price-label">Niños (2 a 5 años)</span>
            <span className="price-value">$25.000</span>
          </div>
          
          <p className="disclaimer">* Precios vigentes agosto y septiembre</p>

          <div className="alias-box">
            <p className="alias-label">Datos para transferencia</p>
            <p className="alias-value">PANA.URU.MP</p>
            <p className="alias-sub">Carabajal Priscila</p>
          </div>
        </div>
      </div>
    </main>
  );
}
