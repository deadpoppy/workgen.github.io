export const handleImageError = (img) => {
    console.error(`图片加载失败: ${img.src}`);
    const fallbackPath = img.dataset.fallback || '/assets/images/fallback.png';
    if (!img.src.includes(fallbackPath)) {
        img.src = fallbackPath;
    }
};

export const initializeImages = () => {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
}; 