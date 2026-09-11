import os
import glob
import re

base_dir = r"c:\Te invitoapp"
html_files = glob.glob(os.path.join(base_dir, "*.html")) + glob.glob(os.path.join(base_dir, "DISEÑOS DE TARJETAS", "*.html"))

features_summary = {}

for filepath in html_files:
    fname = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Extract headings
    headings = re.findall(r'<h[1-6][^>]*>(.*?)</h[1-6]>', content, re.IGNORECASE | re.DOTALL)
    clean_headings = [re.sub(r'<[^>]+>', '', h).strip() for h in headings if len(h.strip()) < 80]
    has_canvas = '<canvas' in content.lower()
    has_audio = '<audio' in content.lower() or 'youtube' in content.lower() or 'music' in content.lower() or 'mp3' in content.lower()
    has_video = '<video' in content.lower() or 'mp4' in content.lower()
    has_countdown = 'countdown' in content.lower() or 'cuenta' in content.lower() or 'días' in content.lower() or 'dias' in content.lower()
    has_gallery = 'galeria' in content.lower() or 'gallery' in content.lower() or 'carousel' in content.lower() or 'slick' in content.lower()
    has_rsvp = 'rsvp' in content.lower() or 'asistencia' in content.lower() or 'confirm' in content.lower()
    has_cbu = 'cbu' in content.lower() or 'alias' in content.lower() or 'regalo' in content.lower() or 'transfer' in content.lower()
    has_instagram = 'instagram' in content.lower() or 'hashtag' in content.lower() or 'filtro' in content.lower()
    has_playlist = 'spotify' in content.lower() or 'cancion' in content.lower() or 'canción' in content.lower() or 'musica' in content.lower()
    has_dresscode = 'dress' in content.lower() or 'vestimenta' in content.lower() or 'código' in content.lower()
    has_modal = 'modal' in content.lower() or 'popup' in content.lower()
    has_map = 'maps' in content.lower() or 'ubicacion' in content.lower() or 'ubicación' in content.lower() or 'llegar' in content.lower()
    
    # Special features detection
    special = []
    if 'discoteca' in fname.lower() or 'three' in content.lower() or '3d' in content.lower():
        special.append("3D Discoball / Three.js / Canvas 3D")
    if 'mariposa' in content.lower() or 'butterfly' in content.lower():
        special.append("Butterfly Particles System")
    if 'neon' in fname.lower() or 'neon' in content.lower():
        special.append("Neon Glow Theme & Animated Glow Effects")
    if 'boho' in fname.lower():
        special.append("Boho Floral Aesthetic")
    if 'bautismo' in fname.lower() or 'babyshower' in fname.lower():
        special.append("Event-Type Customizer (Bautismo/Babyshower/XV/Boda)")
    if 'spotify' in content.lower():
        special.append("Spotify Playlist Suggestion Section")
    if 'filtro' in content.lower() or 'ar' in content.lower():
        special.append("Instagram AR Filter Button")
        
    features_summary[fname] = {
        "headings": clean_headings[:8],
        "has_canvas": has_canvas,
        "has_audio": has_audio,
        "has_video": has_video,
        "has_countdown": has_countdown,
        "has_gallery": has_gallery,
        "has_rsvp": has_rsvp,
        "has_cbu": has_cbu,
        "has_instagram": has_instagram,
        "has_playlist": has_playlist,
        "has_dresscode": has_dresscode,
        "has_modal": has_modal,
        "has_map": has_map,
        "special": special
    }

with open("inventory_results.txt", "w", encoding="utf-8") as out:
    out.write("=== INVENTORY OF ALL INVITATION TEMPLATES ===\n")
    for k, v in features_summary.items():
        out.write(f"\n[FILE] {k}\n")
        out.write(f"   Headings: {v['headings']}\n")
        out.write(f"   Special: {v['special']}\n")
        out.write(f"   Flags: Audio={v['has_audio']}, Video={v['has_video']}, Countdown={v['has_countdown']}, Gallery={v['has_gallery']}, RSVP={v['has_rsvp']}, CBU={v['has_cbu']}, IG={v['has_instagram']}, Playlist={v['has_playlist']}, DressCode={v['has_dresscode']}, Modal={v['has_modal']}, Map={v['has_map']}\n")
print("Saved to inventory_results.txt")
