// 创建图片加载优化工具
export const optimizeImages = {
  lazyLoad: (img) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  }
}; 