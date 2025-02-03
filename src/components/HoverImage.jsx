import { motion } from 'framer-motion';
import Image from 'next/image';
import useImageLoader from '../hooks/useImageLoader';

export default function HoverImage({ src, alt }) {
  useImageLoader(src);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden rounded-2xl group hover-image-container"
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className="w-full h-64 object-cover"
        placeholder="blur"
        blurDataURL="/preview/placeholder.jpg"
        onError={(e) => {
          e.target.src = '/images/fallback.jpg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-indigo-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      </div>
      <div className="image-caption">{alt}</div>
    </motion.div>
  );
} 