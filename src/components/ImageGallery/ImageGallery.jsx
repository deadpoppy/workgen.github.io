import { useState, useMemo } from 'react';
import HoverImage from '../HoverImage';
import useImageLoader from '../../hooks/useImageLoader';

export default function ImageGallery({ images }) {
  const [searchTerm, setSearchTerm] = useState('');
  const loadedImages = useImageLoader(images);

  const filteredImages = useMemo(() => {
    return loadedImages.filter(img => 
      img.tags?.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [loadedImages, searchTerm]);

  return (
    <section className="gallery-container">
      <div className="search-bar mb-6">
        <input
          type="text"
          placeholder="搜索图片标签..."
          className="w-full p-2 rounded border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <HoverImage 
            key={image.id}
            src={image.url}
            alt={image.alt}
            metaData={image.meta}
            className="gallery-item"
          />
        ))}
      </div>
    </section>
  );
} 