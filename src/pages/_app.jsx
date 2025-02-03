import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import ParticlesBackground from '../components/ParticlesBackground';
import CustomCursor from '../components/CustomCursor';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  return (
    <>
      <ParticlesBackground />
      <CustomCursor />
      <AnimatePresence mode='wait'>
        <motion.div
          key={router.route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp; 