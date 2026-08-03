"use client";

import React, { useEffect, useState } from "react";

export default function Butterflies() {
  const [butterflies, setButterflies] = useState<
    { id: number; size: number; delay: number; duration: number; left: number }[]
  >([]);

  useEffect(() => {
    // Generar mariposas aleatorias solo en el cliente
    const numButterflies = 8;
    const newButterflies = [];
    for (let i = 0; i < numButterflies; i++) {
      newButterflies.push({
        id: i,
        size: Math.random() * 50 + 40,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 10,
        left: Math.random() * 100,
      });
    }
    setButterflies(newButterflies);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #butterfly-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 50;
            overflow: hidden;
        }

        .magic-butterfly {
            position: absolute;
            animation: float-butterfly 12s linear infinite;
            opacity: 0.9;
        }

        .magic-butterfly::after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background-image: url('/mariposas.jpg');
            background-size: cover;
            background-position: center;
            border-radius: 50%;
            filter: invert(1) hue-rotate(180deg) contrast(1.5);
            mix-blend-mode: multiply;
            animation: flutter 0.5s ease-in-out infinite alternate;
        }

        @keyframes float-butterfly {
            0% { transform: translateY(110vh) translateX(-20vw) rotate(-15deg); }
            33% { transform: translateY(60vh) translateX(30vw) rotate(10deg); }
            66% { transform: translateY(30vh) translateX(-10vw) rotate(-5deg); }
            100% { transform: translateY(-20vh) translateX(20vw) rotate(15deg); }
        }

        @keyframes flutter {
            0% { transform: scaleX(1) scaleY(1); }
            100% { transform: scaleX(0.2) scaleY(1.1); }
        }
      `}} />
      <div id="butterfly-container">
        {butterflies.map((b) => (
          <div
            key={b.id}
            className="magic-butterfly"
            style={{
              width: \`\${b.size}px\`,
              height: \`\${b.size}px\`,
              left: \`\${b.left}vw\`,
              animationDelay: \`-\${b.delay}s\`,
              animationDuration: \`\${b.duration}s\`
            }}
          />
        ))}
      </div>
    </>
  );
}
