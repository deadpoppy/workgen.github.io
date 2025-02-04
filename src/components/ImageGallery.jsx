import React, { useEffect, useState, useRef, useCallback } from 'react';
import HoverImage from './HoverImage';

// 在组件顶部添加样式
const galleryStyles = {
    imageGallery: {
        padding: '2rem 0',
    },
    sectionTitle: {
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '2rem',
    },
    galleryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '1rem',
    }
};

export default function ImageGallery({ images, layout = 'grid' }) {
    const layouts = {
        grid: 'grid grid-cols-2 md:grid-css-3 gap-4',
        masonry: 'columns-2 md:columns-3 space-y-4',
        carousel: 'flex overflow-x-auto snap-x snap-mandatory'
    };

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const containerRef = useRef(null);

    // 添加键盘导航
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedIndex === -1) return;
            if (e.key === 'Escape') setSelectedIndex(-1);
            if (e.key === 'ArrowRight') setSelectedIndex(prev => 
                Math.min(prev + 1, images.length - 1)
            );
            if (e.key === 'ArrowLeft') setSelectedIndex(prev => 
                Math.max(prev - 1, 0)
            );
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex]);

    // 改进触摸滑动支持
    const handleSwipe = useCallback((direction) => {
        if (direction === 'left') {
            setSelectedIndex(prev => Math.min(prev + 1, images.length - 1));
        } else {
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        }
    }, []);

    return (
        <section style={galleryStyles.imageGallery} className="image-gallery">
            <h2 style={galleryStyles.sectionTitle} className="section-title">功能预览</h2>
            <div 
                ref={containerRef}
                className={`${layouts[layout]} w-full max-w-6xl mx-auto`}
                role="list"
                aria-label="图片画廊"
            >
                {images.map((img, index) => (
                    <div 
                        key={img.id}
                        role="listitem"
                        aria-label={`图片 ${index + 1}`}
                        className={`
                            ${layout === 'carousel' ? 'w-80 flex-shrink-0 snap-center' : 'mb-4'}
                            relative group
                        `}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <HoverImage 
                            src={img.url}
                            alt={img.alt || `Gallery image ${index + 1}`}
                            mode={img.interactionType || 'scale'}
                        />
                        {index === selectedIndex && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>{img.description}</span>
                                <span>{new Date(img.timestamp).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
} 