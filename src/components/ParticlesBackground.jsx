import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        particles: {
          number: { value: 80 },
          color: { value: '#6366f1' },
          opacity: { value: 0.5 },
          size: { value: 3 },
          move: {
            enable: true,
            speed: 1.5,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#818cf8',
            opacity: 0.4,
            width: 1
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: 'repulse'
            }
          }
        }
      }}
      className="absolute inset-0 -z-10"
    />
  );
} 