import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useImageLoader from '../hooks/useImageLoader';

export default function HoverImage({ src, alt, link, mode = 'scale' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  // 添加交叉观察器实现懒加载
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isLoaded) {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            setIsLoaded(true);
            if (imgRef.current) imgRef.current.src = src;
          };
          img.onerror = () => {
            setHasError(true);
          };
        }
      });
    });

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src]);

  const transitionStyles = {
    scale: `transform ${isHovered ? 'scale-105' : 'scale-100'}`,
    parallax: 'transform hover:translate-x-2 hover:-translate-y-2',
    overlay: 'relative after:absolute after:inset-0 after:bg-black/50'
  }[mode];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className={`relative overflow-hidden rounded-2xl group hover-image-container ${isLoaded ? 'loaded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isLoaded && !hasError && <div className="loading-spinner" />}
      <img
        ref={imgRef}
        alt={alt}
        className={`w-full h-64 object-cover ${isLoaded ? 'loaded' : ''}`}
        onError={() => setHasError(true)}
        src={hasError ? '/default-image.jpg' : src}
      />
      {hasError && <div className="error-fallback">图片加载失败</div>}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-indigo-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      </div>
      <div className="image-caption">{alt}</div>
      {link && (
        <a href={link} className="absolute inset-0 z-10 block" aria-label={alt} />
      )}
    </motion.div>
  );
} 