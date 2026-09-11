import os
import glob
import re

count = 0
for filepath in glob.glob(r'C:\Te invitoapp\invitaciones-digitales\src\app\demos\**\page.tsx', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = re.sub(r"const audio = document\.getElementById\('bgAudio'\) \|\| document\.getElementById\('bgMusic'\) as HTMLAudioElement;", "const audio = (document.getElementById('bgAudio') || document.getElementById('bgMusic')) as HTMLAudioElement | null;", content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f'Patched {filepath}')

print(f'Patched {count} files.')
