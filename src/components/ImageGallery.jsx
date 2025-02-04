import React, { useEffect, useState } from 'react';
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

function ImageGallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // 动态导入预览图片
        const importImages = async () => {
            const imageContext = import.meta.glob('../../assets/images/preview/*.{png,jpg,jpeg,gif}');
            console.log('Available image paths:', Object.keys(imageContext));
            const loadedImages = [];
            
            for (const path in imageContext) {
                const image = await imageContext[path]();
                loadedImages.push({
                    src: image.default,
                    alt: path.split('/').pop().split('.')[0]
                        .replace(/-/g, ' ') // 将文件名中的连字符替换为空格
                        .replace(/\b\w/g, c => c.toUpperCase()) // 首字母大写
                });
            }
            
            setImages(loadedImages);
        };

        importImages();
    }, []);

    return (
        <section style={galleryStyles.imageGallery} className="image-gallery">
            <h2 style={galleryStyles.sectionTitle} className="section-title">功能预览</h2>
            <div style={galleryStyles.galleryGrid} className="gallery-grid">
                {images.map((image, index) => (
                    <HoverImage 
                        key={index} 
                        src={image.src} 
                        alt={image.alt}
                    />
                ))}
            </div>
        </section>
    );
}

export default ImageGallery; 