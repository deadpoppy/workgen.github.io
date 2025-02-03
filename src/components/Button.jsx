import { motion } from 'framer-motion';

export default function Button({ children }) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)',
        rotate: [0, -2, 2, -2, 0] 
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold
                 transform transition-all duration-300 hover:bg-indigo-700
                 relative overflow-hidden group"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 
                     transition-opacity duration-300" />
    </motion.button>
  );
} 