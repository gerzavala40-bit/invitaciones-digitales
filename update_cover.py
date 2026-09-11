import re

file_path = r'C:\Users\germa\Downloads\demos\invitacion_clari_v2.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the superimposed text and gradient from the cover section
new_cover = """    <section class="relative h-screen w-full flex items-center justify-center" style="background: #ffffff;">
        <img src="clara.png" alt="Clari XV" class="w-full h-full object-cover object-center">
        <!-- Botón flotante para bajar -->
        <a href="#cuenta-regresiva" class="absolute bottom-8 right-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center border border-text-dark/30 text-text-dark hover:bg-white/80 transition shadow-lg animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </a>
    </section>"""

# Using regex to replace the old cover section
html = re.sub(
    r'<section class="relative h-screen w-full".*?</section>',
    new_cover,
    html,
    flags=re.DOTALL
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated cover section")
