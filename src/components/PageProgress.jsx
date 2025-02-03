import { useEffect } from 'react';
import NProgress from 'nprogress';

export default function PageProgress() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    window.addEventListener('load', handleStop);
    return () => {
      window.removeEventListener('load', handleStop);
    };
  }, []);

  return null;
} 