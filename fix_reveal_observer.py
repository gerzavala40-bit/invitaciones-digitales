import os

demos_dir = r"c:\Te invitoapp\invitaciones-digitales\src\app\demos"

reveal_logic = """
        // Reveal elements on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.add('show');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.05 });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));
"""

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
            
            # Find a safe place to inject the observer: right before "return () => {" inside useEffect
            target = "return () => {"
            
            if target in content and "IntersectionObserver" not in content:
                new_content = content.replace(target, reveal_logic + "\n        " + target)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Injected IntersectionObserver in {path}")
                count += 1

print(f"Successfully injected observer in {count} files.")
