import os

demos_dir = r"c:\Te invitoapp\invitaciones-digitales\src\app\demos"

count = 0
for root, _, files in os.walk(demos_dir):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            # Skip the ones we already hand-coded perfectly
            if 'demo-boda-elegante-oscuro' in path or 'despedida-neon' in path:
                continue
                
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace the old handleEnter logic for main
            # from: if (main) main.classList.add('show');
            # to: if (main) { main.classList.add('show'); main.classList.add('visible'); main.style.opacity = '1'; main.style.visibility = 'visible'; }
            
            old_str = "if (main) main.classList.add('show');"
            new_str = "if (main) { main.classList.add('show'); main.classList.add('visible'); main.style.opacity = '1'; main.style.visibility = 'visible'; }"
            
            if old_str in content:
                new_content = content.replace(old_str, new_str)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed main show in {path}")
                count += 1

print(f"Successfully fixed main show in {count} files.")
