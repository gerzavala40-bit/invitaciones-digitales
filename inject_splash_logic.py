import os
import re

demos_dir = r"c:\Te invitoapp\invitaciones-digitales\src\app\demos"

universal_hook = """
    useEffect(() => {
        const enterBtn = document.getElementById('enterBtn');
        const splash = document.getElementById('splash');
        const main = document.getElementById('mainContent') || document.getElementById('main');
        const musicBtn = document.getElementById('musicBtn');
        const audio = document.getElementById('bgAudio') || document.getElementById('bgMusic') as HTMLAudioElement;

        const handleEnter = () => {
            if (splash) splash.classList.add('hide');
            if (main) main.classList.add('show');
            if (musicBtn) musicBtn.classList.add('visible');
            document.body.classList.remove('locked');
            if (audio) {
                audio.volume = 0.8;
                audio.play().catch(e => console.log('Audio autoplay prevented'));
            }
        };

        if (enterBtn) {
            enterBtn.addEventListener('click', handleEnter);
        }

        // Music toggle
        const handleMusic = () => {
            if (!audio) return;
            if (audio.paused) {
                audio.play();
                musicBtn?.classList.add('on');
                musicBtn.innerHTML = '❚❚';
            } else {
                audio.pause();
                musicBtn?.classList.remove('on');
                musicBtn.innerHTML = '♪';
            }
        };

        if (musicBtn) {
            musicBtn.addEventListener('click', handleMusic);
        }

        return () => {
            if (enterBtn) enterBtn.removeEventListener('click', handleEnter);
            if (musicBtn) musicBtn.removeEventListener('click', handleMusic);
        };
    }, []);
"""

regex = re.compile(r'useEffect\(\(\) => \{\s*// Scripts from original HTML would go here or be converted to React hooks\s*\}, \[\]\);', re.DOTALL)

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
            
            if regex.search(content):
                new_content = regex.sub(universal_hook.strip(), content)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Injected universal hook into {path}")
                count += 1

print(f"Successfully injected universal hook into {count} files.")
