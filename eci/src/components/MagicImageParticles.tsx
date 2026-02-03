import { useEffect, useMemo, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

export default memo(function MagicImageParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const setupEngine = async () => {
      // BUNDLE OPTIMIZATION: Using loadSlim as it's lighter than the full bundle
      const { loadSlim } = await import("@tsparticles/slim");
      
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });

      if (isMounted) setInit(true);
    };

    setupEngine();
    return () => { isMounted = false; };
  }, []);

  const options = useMemo<ISourceOptions>(() => ({
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 30,
    particles: {
      number: { 
        value: 25, 
        density: { enable: true, area: 1000 } 
      },
      shape: {
        type: "image",
        options: {
          image: [
            { src: "/magic1.png", width: 100, height: 100 },
            { src: "/logo1.webp", width: 100, height: 100 },
            { src: "/logo2.webp", width: 100, height: 100 },
          ],
        },
      },
      size: { value: { min: 10, max: 50 } },
      rotate: {
        value: { min: 0, max: 360 },
        animation: { enable: true, speed: 1, sync: false },
      },
      move: {
        enable: true,
        speed: 0.5, // Slower speed = fewer position updates
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
        collisions: { enable: false }, // Critical performance win
      },
      opacity: {
        value: { min: 0.05, max: 0.2 }, // Lowered for a subtle "ghost" effect
        animation: { enable: true, speed: 0.3, sync: false },
      },
    },
    // INTERACTION REMOVED: 
    // Disabling events entirely stops the mouse-tracking listener
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
    },
    // PERFORMANCE: detectRetina is costly on 4K/high-DPI screens
    detectRetina: false, 
  }), []);

  if (!init) return null;

  return (
    <Particles
      id="magicParticles"
      options={options}
      // Added will-change-transform for GPU acceleration hint
      className="fixed inset-0 z-0 pointer-events-none opacity-100 transition-opacity duration-1000 [will-change:transform]" 
    />
  );
});