import { ParallaxProvider } from 'react-scroll-parallax';
import { Parallax } from 'react-scroll-parallax';

export function ParallaxSection({ children, speed = 10 }) {
  return (
    <ParallaxProvider>
      <Parallax speed={speed}>
        <div className="py-20">
          {children}
        </div>
      </Parallax>
    </ParallaxProvider>
  );
} 