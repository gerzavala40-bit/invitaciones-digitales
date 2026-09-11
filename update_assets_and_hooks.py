import os
import re

base_dir = r"c:\Te invitoapp\invitaciones-digitales\src\app\demos"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Media Paths to /assets-demos/
    # Find all src="xyz" or url('xyz') that are relative (don't start with http, /, data:)
    
    # img src
    content = re.sub(r'src="(?!(http|/|data:))([^"]+)"', r'src="/assets-demos/\2"', content)
    # url(...) in inline styles (though we stripped them mostly, some might remain)
    content = re.sub(r'url\([\'"]?(?!(http|/|data:))([^\'"\)]+)[\'"]?\)', r'url("/assets-demos/\2")', content)

    # 2. Basic Hooks Injection for Splash Screen and Music
    # If not already injected (check if useState is present)
    if 'useState' not in content and 'useEffect' not in content:
        # Add imports
        if 'use client' not in content:
            content = "'use client';\nimport { useState, useRef, useEffect, Suspense } from 'react';\nimport { useSearchParams } from 'next/navigation';\n" + content
            
            # Wrap export in Suspense and add hooks
            content = re.sub(r'export default function (\w+)\(\) \{', r'''function \1Content() {
    const searchParams = useSearchParams();
    const [splashOpen, setSplashOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handleOpenInvite = () => {
        setSplashOpen(true);
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
        }
    };

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true));
        }
    };
''', content)
            
            # Append Suspense wrapper at the end
            # We need to know the function name. Let's just find it.
            func_name_match = re.search(r'function (\w+)Content\(\) \{', content)
            if func_name_match:
                func_name = func_name_match.group(1)
                content += f"""
export default function {func_name}() {{
    return (
        <Suspense fallback={{<div>Cargando...</div>}}>
            <{func_name}Content />
        </Suspense>
    );
}}
"""
        # Wire up click handlers and dynamic classes for splash screen
        content = content.replace('id="btnOpenInvite"', 'id="btnOpenInvite" onClick={handleOpenInvite}')
        content = content.replace('id="btnMusic"', 'id="btnMusic" onClick={toggleMusic}')
        content = content.replace('id="music"', 'id="music" ref={audioRef}')
        content = content.replace('className="splash-screen"', 'className={`splash-screen ${splashOpen ? "slide-up" : ""}`}')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file == 'page.tsx':
            process_file(os.path.join(root, file))
