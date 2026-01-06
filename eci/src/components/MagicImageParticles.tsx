import { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function MagicImageParticles() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false }, // Keep false so we control it via CSS below
      background: { color: "transparent" },
      fpsLimit: 60,
      particles: {
        number: { value: 50, density: { enable: true, width: 1920, height: 1080 } },
        color: { value: "#4f9cff" },
        shape: {
          type: "image",
          options: {
            image: [
              { src: "/magic1.png", width: 500, height: 500 },
              { src: "/logo1.webp", width: 500, height: 500 },
              { src: "/logo2.webp", width: 500, height: 500 },
            ],
          },
        },
        size: { value: { min: 5, max: 50 } },
        rotate: {
          value: { min: 0, max: 360 },
          direction: "random" as const,
          animation: { enable: true, speed: 5, sync: false },
        },
        move: {
          enable: true,
          speed: 1,
          outModes: { default: "out" as const },
        },
        opacity: {
          value: 0.3, 
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
            sync: false,
          },
        },
      },
      interactivity: {
        detectsOn: "window", // Changed to window for better fixed detection
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          repulse: { distance: 150, duration: 0.6 },
          push: { quantity: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id="magicParticles"
      options={options}
      // Changed 'absolute' to 'fixed' so it stays on screen while scrolling
      // Ensure z-index is low (z-0 or -1) so it doesn't block content
      className="fixed inset-0 z-0 pointer-events-none" 
      // Note: Added pointer-events-none so you can click buttons UNDER the particles. 
      // If you want to interact with particles (repulse/click), remove 'pointer-events-none'.
    />
  );
}