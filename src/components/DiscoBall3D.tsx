"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function DiscoBall3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Escena, Cámara y Renderizador
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    const updateSize = () => {
      const width = window.innerWidth;
      // We want to just cover the hero section height, or the full window height
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    updateSize();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Controles para rotar la bola con el ratón
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Desactivar zoom
    controls.enablePan = false;

    // Geometría: una esfera con muchos segmentos para simular los espejos
    const geometry = new THREE.SphereGeometry(6, 64, 64); 
    
    // Material: Plateado brillante (Gris metálico)
    const material = new THREE.MeshStandardMaterial({ 
        color: 0xcccccc, // Gris plateado claro
        metalness: 0.9,  // Alto factor metálico para que actúe como espejo
        roughness: 0.1,  // Muy liso para destellos nítidos
        flatShading: true
    });

    const discoBall = new THREE.Mesh(geometry, material);
    discoBall.castShadow = true;
    discoBall.receiveShadow = true;
    
    // Usamos EdgesGeometry para dibujar solo los bordes de la geometría
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ 
        color: 0x888888,
        transparent: true,
        opacity: 0.8
    });
    const discoLines = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    discoBall.add(discoLines); 

    scene.add(discoBall);

    // Luz hemisférica con tonos oscuros (azul y morado)
    const hemiLight = new THREE.HemisphereLight(0x8800ff, 0x002244, 1.5);
    scene.add(hemiLight);

    const lightGroup = new THREE.Group();
    scene.add(lightGroup);

    function addColorLight(color: number, x: number, y: number, z: number) {
        const light = new THREE.DirectionalLight(color, 2.5);
        light.position.set(x, y, z);
        lightGroup.add(light);
    }

    addColorLight(0xff00ff, 20, 0, 0);   // Derecha: Rosa magenta
    addColorLight(0x00ffff, -20, 0, 0);  // Izquierda: Cyan
    addColorLight(0xffff00, 0, 20, 0);   // Arriba: Amarillo
    addColorLight(0x0044ff, 0, -20, 0);  // Abajo: Azul intenso
    addColorLight(0x00ff55, 0, 0, 20);   // Frente: Verde neón
    addColorLight(0xff0044, 0, 0, -20);  // Atrás: Rojo

    const whiteHighlight = new THREE.DirectionalLight(0xffffff, 1.5);
    whiteHighlight.position.set(10, 10, 15);
    scene.add(whiteHighlight);

    let animationFrameId: number;

    function animate() {
        animationFrameId = requestAnimationFrame(animate);

        discoBall.rotation.y += 0.005;
        discoBall.rotation.x += 0.001;
        discoBall.rotation.z += 0.002;
        
        lightGroup.rotation.x += 0.006;
        lightGroup.rotation.y -= 0.008;
        lightGroup.rotation.z += 0.004;

        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // clean up geometry and materials
      geometry.dispose();
      material.dispose();
      edgesGeometry.dispose();
      edgesMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
}
