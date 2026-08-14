import os
import json

demos_dir = r"c:\Te invitoapp\invitaciones-digitales\src\app\demos"

features = {
    "Música": ['<audio', 'id="bgAudio"', 'id="bgMusic"'],
    "Cuenta Regresiva": ['countdown', 'cd-item', 'id="cd-days"'],
    "RSVP (Base de Datos)": ['/api/rsvp', 'fetch('],
    "Mesa de Regalos": ['CBU', 'Alias', 'Mesa de regalos', 'Regalo'],
    "Galería": ['gallery-grid', 'gallery-item', 'galeria'],
    "Dress Code": ['dresscode', 'Código de Vestimenta', 'Dress Code'],
    "Ubicación / Mapa": ['Lugar', 'Salón', 'Ubicación', 'mapa', 'iframe'],
}

results = {}

for root, _, files in os.walk(demos_dir):
    for file in files:
        if file.endswith('.tsx'):
            demo_name = os.path.basename(root)
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read().lower()
            
            demo_features = {}
            for feature, keywords in features.items():
                has_feature = any(kw.lower() in content for kw in keywords)
                demo_features[feature] = "✅" if has_feature else "❌"
            
            results[demo_name] = demo_features

print(json.dumps(results, indent=2))
