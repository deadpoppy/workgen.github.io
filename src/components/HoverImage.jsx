import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useImageLoader from '../hooks/useImageLoader';

export default function HoverImage({ image }) {
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
          img.src = image.url;
          img.onload = () => {
            setIsLoaded(true);
            if (imgRef.current) imgRef.current.src = image.url;
          };
          img.onerror = () => {
            setHasError(true);
          };
        }
      });
    });

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [image.url]);

  const transitionStyles = {
    scale: `transform ${isHovered ? 'scale-105' : 'scale-100'}`,
    parallax: 'transform hover:translate-x-2 hover:-translate-y-2',
    overlay: 'relative after:absolute after:inset-0 after:bg-black/50'
  }[image.mode];

  return (
    <div style={{
      position: 'relative',
      width: '300px',
      height: '400px',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
      }
    }}>
      {!isLoaded && !hasError && <div className="loading-spinner" />}
      <img
        ref={imgRef}
        src={image.url}
        alt={image.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s ease'
        }}
        onError={() => setHasError(true)}
      />
      {hasError && <div className="error-fallback">图片加载失败</div>}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
        color: 'white'
      }}>
        <h3>{image.title}</h3>
        <p>{image.description}</p>
      </div>
    </div>
  );
} 