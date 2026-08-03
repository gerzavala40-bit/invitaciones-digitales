import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CostosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  if (slug !== '15anos-clara') {
    notFound();
  }

  return (
    <>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          opacity: 0.7
        }}
      >
        <source src="/mariposas.mp4" type="video/mp4" />
      </video>
      <main className="min-h-screen py-12 px-4 flex flex-col items-center justify-center" style={{ fontFamily: "var(--font-sans)", color: "#ffffff", background: "transparent" }}>
      <style>{`
        .clara-costos h2 { font-family: var(--font-display); color: #ffffff; text-transform: uppercase; font-weight: 900; letter-spacing: 0.05em; font-size: 2rem; margin-bottom: 1.5rem; text-shadow: 1px 1px 4px rgba(0,0,0,0.3); }
        .clara-costos .price-card { background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.2); padding: 2rem; border-radius: 16px; margin-bottom: 2rem; }
        .clara-costos .price-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 1rem 0; }
        .clara-costos .price-row:last-child { border-bottom: none; }
        .clara-costos .price-label { font-weight: 700; color: rgba(255,255,255,0.9); text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; }
        .clara-costos .price-value { font-weight: 900; color: #ffffff; font-size: 1.25rem; }
        .clara-costos .disclaimer { text-align: center; font-size: 0.75rem; color: #C4A661; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 1rem; }
        
        .clara-costos .alias-box { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 1.5rem; text-align: center; margin-top: 2rem; }
        .clara-costos .alias-label { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.8); margin-bottom: 0.5rem; font-weight: 700; }
        .clara-costos .alias-value { font-family: var(--font-display); font-size: 1.2rem; color: #ffffff; font-weight: 900; margin-bottom: 0.35rem; }
        .clara-costos .alias-sub { font-size: 0.8rem; color: rgba(255,255,255,0.9); font-weight: 600; margin-bottom: 0; }
      `}</style>
      
      <div className="w-full max-w-md mx-auto clara-costos">
        <a href={`/${slug}`} className="text-sm underline mb-8 inline-block opacity-90 hover:opacity-100 uppercase tracking-widest font-bold text-white drop-shadow-md text-center w-full">
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
    </>
  );
}
