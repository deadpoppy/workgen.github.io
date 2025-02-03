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
      className="relative overflow-hidden rounded-2xl group"
    >
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
        placeholder="blur"
        blurDataURL="/images/placeholder.jpg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
} 