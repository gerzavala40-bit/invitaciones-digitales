import os

demos_dir = r"c:\Te invitoapp\invitaciones-digitales\src\app\demos"

features = {
    "Cuenta Regresiva": ['countdown', 'cd-item', 'id="cd-days"'],
    "Mesa de Regalos": ['CBU', 'Alias', 'Mesa de regalos', 'Regalo'],
    "Galería": ['gallery-grid', 'gallery-item', 'galeria'],
    "Dress Code": ['dresscode', 'Código de Vestimenta', 'Dress Code', 'outfit'],
    "Ubicación / Mapa": ['Lugar', 'Salón', 'Ubicación', 'mapa', 'iframe'],
}

blocks = {
    "Cuenta Regresiva": """
    {/*  CUENTA REGRESIVA INYECTADA  */}
    <section className="reveal" style={{padding: "4rem 2rem", textAlign: "center"}}>
      <h2 style={{fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "2rem"}}>Faltan</h2>
      <div style={{display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap"}}>
        <div style={{background: "rgba(128,128,128,0.1)", padding: "1rem", borderRadius: "12px", minWidth: "70px"}}>
          <div style={{fontSize: "2rem", fontWeight: "bold"}}>--</div>
          <div style={{fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.7}}>Días</div>
        </div>
        <div style={{background: "rgba(128,128,128,0.1)", padding: "1rem", borderRadius: "12px", minWidth: "70px"}}>
          <div style={{fontSize: "2rem", fontWeight: "bold"}}>--</div>
          <div style={{fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.7}}>Hs</div>
        </div>
        <div style={{background: "rgba(128,128,128,0.1)", padding: "1rem", borderRadius: "12px", minWidth: "70px"}}>
          <div style={{fontSize: "2rem", fontWeight: "bold"}}>--</div>
          <div style={{fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.7}}>Min</div>
        </div>
      </div>
    </section>
""",
    "Mesa de Regalos": """
    {/*  MESA DE REGALOS INYECTADA  */}
    <section className="reveal" style={{padding: "4rem 2rem", textAlign: "center"}}>
      <h2 style={{fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem"}}>Mesa de Regalos</h2>
      <p style={{marginBottom: "2rem", opacity: 0.8}}>Tu presencia es el mejor regalo. Si deseás sumar un detalle:</p>
      <div style={{background: "rgba(128,128,128,0.1)", padding: "2rem", borderRadius: "16px", maxWidth: "400px", margin: "0 auto"}}>
        <p style={{marginBottom: "1rem"}}><strong>Alias:</strong> mi.fiesta.2026</p>
        <p style={{marginBottom: "1rem"}}><strong>CBU:</strong> 00000000000000000000</p>
        <button style={{background: "currentColor", color: "var(--bg, #fff)", border: "none", padding: "0.8rem 1.5rem", borderRadius: "50px", fontWeight: "bold", cursor: "pointer"}}>Copiar Datos</button>
      </div>
    </section>
""",
    "Galería": """
    {/*  GALERIA INYECTADA  */}
    <section className="reveal" style={{padding: "4rem 2rem", textAlign: "center"}}>
      <h2 style={{fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "2rem"}}>Galería</h2>
      <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", maxWidth: "500px", margin: "0 auto"}}>
        <div style={{aspectRatio: "1", background: "rgba(128,128,128,0.2)", borderRadius: "16px"}}></div>
        <div style={{aspectRatio: "1", background: "rgba(128,128,128,0.2)", borderRadius: "16px"}}></div>
        <div style={{aspectRatio: "1", background: "rgba(128,128,128,0.2)", borderRadius: "16px"}}></div>
        <div style={{aspectRatio: "1", background: "rgba(128,128,128,0.2)", borderRadius: "16px"}}></div>
      </div>
    </section>
""",
    "Dress Code": """
    {/*  DRESS CODE INYECTADO  */}
    <section className="reveal" style={{padding: "4rem 2rem", textAlign: "center"}}>
      <h2 style={{fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem"}}>Dress Code</h2>
      <div style={{background: "rgba(128,128,128,0.1)", padding: "2rem", borderRadius: "16px", maxWidth: "400px", margin: "0 auto"}}>
        <h3 style={{fontSize: "1.2rem", marginBottom: "0.5rem"}}>Elegante Sport</h3>
        <p style={{opacity: 0.8}}>Vení con tu mejor outfit para disfrutar la noche.</p>
      </div>
    </section>
""",
    "Ubicación / Mapa": """
    {/*  UBICACION INYECTADA  */}
    <section className="reveal" style={{padding: "4rem 2rem", textAlign: "center"}}>
      <h2 style={{fontSize: "1.5rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem"}}>Ubicación</h2>
      <div style={{background: "rgba(128,128,128,0.1)", padding: "2rem", borderRadius: "16px", maxWidth: "400px", margin: "0 auto"}}>
        <h3 style={{fontSize: "1.2rem", marginBottom: "0.5rem"}}>Salón Principal</h3>
        <p style={{opacity: 0.8, marginBottom: "1.5rem"}}>Av. Siempre Viva 1234</p>
        <button style={{background: "currentColor", color: "var(--bg, #fff)", border: "none", padding: "0.8rem 1.5rem", borderRadius: "50px", fontWeight: "bold", cursor: "pointer"}}>Ver en Maps</button>
      </div>
    </section>
"""
}

count = 0
for root, _, files in os.walk(demos_dir):
    for file in files:
        if file.endswith('.tsx'):
            demo_name = os.path.basename(root)
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            content_lower = content.lower()
            
            # Determine what to inject
            to_inject = ""
            for feature, keywords in features.items():
                if not any(kw.lower() in content_lower for kw in keywords):
                    to_inject += blocks[feature]
            
            if to_inject:
                # Find injection point: right before RSVP section
                injection_points = ["{/*  RSVP  */}", "{/* Formulario RSVP Headless Inyectado */}"]
                injected = False
                for point in injection_points:
                    if point in content:
                        content = content.replace(point, to_inject + "\n    " + point)
                        injected = True
                        break
                
                if injected:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Injected missing sections into {demo_name}")
                    count += 1
                else:
                    print(f"Could not find injection point in {demo_name}")

print(f"Successfully injected missing sections in {count} templates.")
