import os
import re

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
            
            # Replace the old handleEnter logic
            # from: if (splash) splash.classList.add('hide');
            # to: if (splash) { splash.classList.add('hide'); splash.classList.add('hidden'); splash.style.opacity = '0'; splash.style.visibility = 'hidden'; splash.style.pointerEvents = 'none'; }
            
            old_str = "if (splash) splash.classList.add('hide');"
            new_str = "if (splash) { splash.classList.add('hide'); splash.classList.add('hidden'); splash.style.opacity = '0'; splash.style.visibility = 'hidden'; splash.style.pointerEvents = 'none'; }"
            
            if old_str in content:
                new_content = content.replace(old_str, new_str)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed splash hide in {path}")
                count += 1

print(f"Successfully fixed splash hide in {count} files.")
