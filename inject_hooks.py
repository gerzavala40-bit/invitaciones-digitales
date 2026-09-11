import re
import sys

def inject_hooks(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Import hooks
    if "import { useEffect" in content:
        content = content.replace("import { useEffect } from 'react';", "import { useEffect, useState, useRef } from 'react';\nimport { useSearchParams } from 'next/navigation';")

    # The hooks logic
    hooks_logic = """
    const searchParams = useSearchParams();
    const customName = searchParams.get('customName') || 'Julieta';
    const avatarUrl = searchParams.get('avatar');
    const bgUrl = searchParams.get('bg');
    
    const [splashOpen, setSplashOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    
    const [countdown, setCountdown] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });
    const [copyMsgOpacity, setCopyMsgOpacity] = useState(0);
    
    const [muroComments, setMuroComments] = useState([]);
    const [muroInput, setMuroInput] = useState({ author: '', text: '', tag: 'Fiesta' });
    
    const [rsvpData, setRsvpData] = useState({ asiste: 'Si', name: '', diet: 'Sin restricciones', tshirt: 'M' });

    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 45);
        targetDate.setHours(22, 0, 0, 0);

        const updateCountdown = () => {
            const now = new Date().getTime();
            const diff = targetDate.getTime() - now;
            if (diff <= 0) return;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            setCountdown({
                days: days < 10 ? '0' + days : days.toString(),
                hours: hours < 10 ? '0' + hours : hours.toString(),
                mins: minutes < 10 ? '0' + minutes : minutes.toString(),
                secs: seconds < 10 ? '0' + seconds : seconds.toString()
            });
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

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

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyMsgOpacity(1);
            setTimeout(() => setCopyMsgOpacity(0), 2000);
        });
    };

    const handleMuroSubmit = (e) => {
        e.preventDefault();
        if (!muroInput.author || !muroInput.text) return;
        setMuroComments([{...muroInput, id: Date.now()}, ...muroComments]);
        setMuroInput({...muroInput, text: '', author: ''});
    };

    const handleRsvpSubmit = (e) => {
        e.preventDefault();
        let message = rsvpData.asiste === "Si" 
            ? `¡Hola! Confirmo mi asistencia para la despedida de ${customName} 🎉\\n\\n*Nombre:* ${rsvpData.name}\\n*Asiste:* Sí, obvio 🍻\\n*Dieta:* ${rsvpData.diet}\\n*Talle:* ${rsvpData.tshirt}`
            : `¡Hola! Lamentablemente no puedo asistir para la despedida de ${customName} 😢\\n\\n*Nombre:* ${rsvpData.name}\\n*Asiste:* No puedo`;
        
        window.open(`https://wa.me/5493425299942?text=${encodeURIComponent(message)}`, '_blank');
    };
"""

    # Inject hooks into the component body
    content = re.sub(r'useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);', hooks_logic, content)
    
    # Add Suspense for useSearchParams
    content = content.replace("export default function DemoDespedidaNeon() {", "import { Suspense } from 'react';\n\nfunction DemoContent() {")
    
    # Wrap in Suspense export
    suspense_wrapper = """
export default function DemoDespedidaNeon() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <DemoContent />
        </Suspense>
    );
}
"""
    content += suspense_wrapper

    # Quick and dirty event replacement (since it's a generated JSX file)
    # This won't cover everything but covers the main buttons for the demo MVP.
    content = content.replace('id="btnOpenInvite"', 'id="btnOpenInvite" onClick={handleOpenInvite}')
    content = content.replace('id="btnMusic"', 'id="btnMusic" onClick={toggleMusic}')
    content = content.replace('id="btnCopyAlias"', 'id="btnCopyAlias" onClick={() => handleCopy("JULI.DESPEDIDA.MP")}')
    content = content.replace('onsubmit="sendRsvp(event)"', 'onSubmit={handleRsvpSubmit}')
    content = content.replace('onsubmit="addComment(event)"', 'onSubmit={handleMuroSubmit}')
    
    content = content.replace('id="splashScreen" className="splash-screen"', 'id="splashScreen" className={`splash-screen ${splashOpen ? "slide-up" : ""}`}')
    content = content.replace('id="music"', 'id="music" ref={audioRef}')
    
    # Countdowns
    content = content.replace('id="cd-days">00', 'id="cd-days">{countdown.days}')
    content = content.replace('id="cd-hours">00', 'id="cd-hours">{countdown.hours}')
    content = content.replace('id="cd-mins">00', 'id="cd-mins">{countdown.mins}')
    content = content.replace('id="cd-secs">00', 'id="cd-secs">{countdown.secs}')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    inject_hooks(sys.argv[1])
