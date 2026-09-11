import os
import glob
import re

count = 0
for filepath in glob.glob(r'C:\Te invitoapp\invitaciones-digitales\src\app\demos\**\page.tsx', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix the missing null check for musicBtn.innerHTML
    # We'll replace the block:
    # musicBtn?.classList.add('on');
    # musicBtn.innerHTML = '...';
    # with
    # if (musicBtn) { musicBtn.classList.add('on'); musicBtn.innerHTML = '...'; }
    
    # To be safe and simple, let's just find `musicBtn.innerHTML` and replace it with `if (musicBtn) musicBtn.innerHTML`
    # Also `musicBtn.classList` if it's not using optional chaining somewhere else.
    # Actually, let's just do a blanket regex:
    new_content = re.sub(r"musicBtn\.innerHTML\s*=", "if (musicBtn) musicBtn.innerHTML =", content)
    new_content = re.sub(r"musicBtn\.classList\.add", "if (musicBtn) musicBtn.classList.add", new_content)
    new_content = re.sub(r"musicBtn\.classList\.remove", "if (musicBtn) musicBtn.classList.remove", new_content)
    new_content = re.sub(r"if \(musicBtn\) musicBtn\?\.classList", "if (musicBtn) musicBtn.classList", new_content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f'Patched {filepath}')

print(f'Patched {count} files.')
