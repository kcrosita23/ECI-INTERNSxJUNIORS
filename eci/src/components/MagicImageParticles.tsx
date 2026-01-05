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
      fullScreen: { enable: false },
      background: {
        color: "transparent",
      },
      fpsLimit: 30,
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
        },
        color: {
          value: "#4f9cff",
        },
        shape: {
          type: "image",
          options: {
            image: [
              {
                src: "/magic1.png",
                width: 500,
                height: 500,
              },
              {
                src: "/logo1.webp",
                width: 500,
                height: 500,
              },
              {
                src: "/logo2.webp",
                width: 500,
                height: 500,
              },
            ],
          },
        },
        size: {
          value: { min: 5, max: 50 },
        },
        rotate: {
          value: { min: 0, max: 360 },
          direction: "random" as const,
          animation: {
            enable: true,
            speed: 5,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: 1,
          outModes: {
            default: "out" as const,
          },
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
      className="absolute inset-0 z-0"
    />
  );
}