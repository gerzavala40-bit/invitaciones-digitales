import re
import sys
import os

def convert_html_to_jsx(html_file, output_dir):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract CSS
    style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
    css_content = style_match.group(1) if style_match else ''

    # Extract Body (excluding scripts for now to avoid React errors)
    body_match = re.search(r'<body[^>]*>(.*?)<script>', content, re.DOTALL)
    if not body_match:
        body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL)
    
    body_content = body_match.group(1) if body_match else ''

    # JSX Conversions on body
    # 1. class to className
    jsx = re.sub(r'\bclass=', 'className=', body_content)
    
    # 2. for to htmlFor
    jsx = re.sub(r'\bfor=', 'htmlFor=', jsx)
    
    # 3. Close unclosed tags (img, input, br, hr)
    jsx = re.sub(r'<img([^>]*?)(?<!/)>', r'<img\1 />', jsx)
    jsx = re.sub(r'<input([^>]*?)(?<!/)>', r'<input\1 />', jsx)
    jsx = re.sub(r'<br([^>]*?)(?<!/)>', r'<br\1 />', jsx)
    jsx = re.sub(r'<hr([^>]*?)(?<!/)>', r'<hr\1 />', jsx)
    
    # 4. Strip inline styles for MVP to avoid JSX object errors
    jsx = re.sub(r'\bstyle="[^"]*"', '', jsx)

    # 5. Fix comments <!-- --> to {/* */}
    jsx = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', jsx, flags=re.DOTALL)

    # 6. Fix any attributes like autoplay, loop, muted, playsinline, required, checked to camelCase or boolean
    jsx = re.sub(r'\bautoplay\b', 'autoPlay', jsx)
    jsx = re.sub(r'\bplaysinline\b', 'playsInline', jsx)
    
    # Prepare component
    component = f"""'use client';
import './style.css';
import {{ useEffect }} from 'react';

export default function DemoDespedidaNeon() {{
    useEffect(() => {{
        // Scripts from original HTML would go here or be converted to React hooks
    }}, []);

    return (
        <div className="demo-wrapper">
            {jsx}
        </div>
    );
}}
"""

    os.makedirs(output_dir, exist_ok=True)

    # Write CSS
    with open(os.path.join(output_dir, 'style.css'), 'w', encoding='utf-8') as f:
        f.write(css_content)
        f.write("\n.demo-wrapper { background: var(--bg); color: var(--white); font-family: 'Jost', sans-serif; min-height: 100vh; }\n")

    # Write TSX
    with open(os.path.join(output_dir, 'page.tsx'), 'w', encoding='utf-8') as f:
        f.write(component)

if __name__ == "__main__":
    convert_html_to_jsx(sys.argv[1], sys.argv[2])
