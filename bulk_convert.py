import os
import subprocess

demos = [
    "demo-15-camila-glam",
    "demo-15anos-clara",
    "demo-babyshower-malena",
    "demo-bautismo-benicio",
    "demo-boda-elegante-oscuro",
    "demo-boda-floral-claro",
    "demo-boda-noche-dorada",
    "demo-boda-premium",
    "demo-canva-boho",
    "demo-corporativo-gala",
    "demo-cumple-minimalista"
]

base_dir = r"c:\Te invitoapp\invitaciones-digitales"
public_dir = os.path.join(base_dir, "public")
demos_app_dir = os.path.join(base_dir, "src", "app", "demos")
convert_script = r"c:\Te invitoapp\convert_jsx.py"

for demo in demos:
    html_file = os.path.join(public_dir, f"{demo}.html")
    if os.path.exists(html_file):
        out_dir = os.path.join(demos_app_dir, demo)
        print(f"Converting {demo}...")
        # Run convert_jsx.py
        subprocess.run(["python", convert_script, html_file, out_dir])
        
        # We won't run inject_hooks.py automatically because the class names and IDs 
        # might differ slightly between templates. We'll just fix up the syntax errors.
        
        # Read the generated page.tsx to fix common syntax errors
        page_path = os.path.join(out_dir, "page.tsx")
        if os.path.exists(page_path):
            with open(page_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix unclosed source tags
            content = content.replace('type="audio/mpeg">', 'type="audio/mpeg" />')
            content = content.replace('type="audio/mp3">', 'type="audio/mp3" />')
            
            # Fix selected and checked
            import re
            content = re.sub(r'\bchecked\b(?!={)', 'defaultChecked', content)
            content = re.sub(r'\bselected\b(?!={)', '', content)
            
            with open(page_path, 'w', encoding='utf-8') as f:
                f.write(content)

print("Bulk conversion completed.")
