import { useEffect } from 'react';

export default function useImageLoader(src) {
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const elements = document.querySelectorAll(`img[src*="${src.split('/').pop()}"]`);
      elements.forEach(el => el.setAttribute('data-loaded', 'true'));
    };
  }, [src]);
} 