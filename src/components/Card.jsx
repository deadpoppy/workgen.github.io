import { motion } from 'framer-motion';

export default function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg
                 backdrop-blur-lg bg-opacity-40 dark:bg-opacity-40
                 border border-white/20 relative overflow-hidden
                 before:absolute before:inset-0 before:bg-gradient-to-br 
                 before:from-indigo-500/20 before:to-pink-500/20 before:-z-10"
    >
      {children}
    </motion.div>
  );
} 