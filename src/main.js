import { initializeImages } from './utils/imageHandler.js';
import { performanceMonitor } from './utils/performance.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeImages();
    performanceMonitor.measurePageLoad();
    
    // 初始化动画
    AOS.init({
        duration: 1000,
        once: true
    });
}); 