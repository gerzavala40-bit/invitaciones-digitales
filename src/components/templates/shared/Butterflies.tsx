"use client";

import React from "react";

export default function Butterflies() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50,
        overflow: "hidden",
        mixBlendMode: "screen", // Ideal para videos con fondo negro y mariposas brillantes
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.9,
        }}
      >
        <source src="/mariposas.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
