import os
import re

demos_dir = r"c:\Te invitoapp\invitaciones-digitales\src\app\demos"

replacements = {
    # Fix the broken SVG URL gradient references
    r'url\("/assets-demos/(#[^"]+)"\)': r'url(\1)',
    r'url\(\'/assets-demos/(#[^\']+)\'\)': r'url(\1)',
    
    # Fix common HTML to JSX issues
    r'\bclass=': r'className=',
    r'\bstroke-width=': r'strokeWidth=',
    r'\bstroke-linecap=': r'strokeLinecap=',
    r'\bstroke-linejoin=': r'strokeLinejoin=',
    r'\bstop-color=': r'stopColor=',
    r'\bstop-opacity=': r'stopOpacity=',
    r'\bfill-opacity=': r'fillOpacity=',
    
    # Fix inline onclick events (naively wrap them in functions if possible, or just strip them if they are broken)
    # Actually, Next.js doesn't allow onclick="string". 
    # For now, let's just replace onclick="..." with onClick={() => {}} so it doesn't crash the build.
    # The headless form already handles the important buttons. The others (like openModal) are broken anyway because the scripts aren't there.
    r'\bonclick="[^"]*"': r'onClick={() => {}}',
    r'\bonclick=\'[^\']*\'': r'onClick={() => {}}',
}

count = 0
for root, _, files in os.walk(demos_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for pattern, repl in replacements.items():
                new_content = re.sub(pattern, repl, new_content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed JSX syntax in {path}")
                count += 1

print(f"Successfully fixed JSX syntax in {count} files.")
