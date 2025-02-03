import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const checkHover = () => {
      setIsHovering(document.querySelector(':hover')?.matches('button, a'));
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', checkHover);
    window.addEventListener('mousemove', checkHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', checkHover);
      window.removeEventListener('mousemove', checkHover);
    };
  }, []);

  return (
    <div className="fixed pointer-events-none z-50" 
         style={{ left: position.x, top: position.y }}>
      <div className={`absolute -translate-x-1/2 -translate-y-1/2 
        transition-all duration-100 ease-out 
        ${isHovering ? 'w-8 h-8 bg-indigo-500/20' : 'w-6 h-6 bg-indigo-500/10'}
        rounded-full border-2 border-indigo-500/30 backdrop-blur-sm`} />
    </div>
  );
} 