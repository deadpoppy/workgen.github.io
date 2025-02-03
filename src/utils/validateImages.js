const requiredImages = [
  '/preview/AI周报总结.jpg',
  '/preview/dashboard.png',
  '/preview/日报列表.jpg',
  '/preview/智能代办.jpg',
  '/preview/智能统计.jpg',
  '/preview/自动化日报生成.jpg'
];

export function validatePreviewImages() {
  requiredImages.forEach(path => {
    const img = new Image();
    img.src = path;
    img.onerror = () => console.error(`图片加载失败: ${path}`);
  });
} 