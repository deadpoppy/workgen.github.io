const requiredImages = [
  '/preview/AI周报总结.jpg',
  '/preview/dashboard.png',
  '/preview/日报列表.jpg',
  '/preview/智能代办.jpg',
  '/preview/智能统计.jpg',
  '/preview/自动化日报生成.jpg'
];

export function validatePreviewImages() {
    const imagePaths = [
        'images/preview/日报列表.jpg',
        'images/preview/智能代办.jpg',
        'images/preview/智能统计.jpg',
        'images/preview/自动化日报生成.jpg'
    ];

    imagePaths.forEach(path => {
        const img = new Image();
        img.onload = () => console.log(`图片加载成功: ${path}`);
        img.onerror = () => console.error(`图片加载失败: ${path}`);
        img.src = path;
    });
}

function validateImageUrl(url) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    return imageExtensions.some(ext => url.endsWith(ext));
}

function validateImageDimensions(image, minWidth, minHeight) {
    return image.width >= minWidth && image.height >= minHeight;
}

export { validateImageUrl, validateImageDimensions }; 