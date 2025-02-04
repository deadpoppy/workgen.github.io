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

export const validateImages = async (imageUrls) => {
  const validationResults = await Promise.all(
    imageUrls.map(async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) throw new Error('Invalid status');
        
        const contentType = response.headers.get('content-type');
        if (!contentType?.startsWith('image/')) {
          return { url, isValid: false, error: 'Invalid content type' };
        }
        
        // 添加尺寸验证
        const img = new Image();
        img.src = url;
        await new Promise((resolve, reject) => {
          img.onload = () => {
            if (img.naturalWidth === 0 || img.naturalHeight === 0) {
              reject('Invalid image dimensions');
            } else {
              resolve();
            }
          };
          img.onerror = () => reject('Failed to load image');
        });
        
        return { url, isValid: true };
      } catch (error) {
        console.error(`Image validation failed for ${url}:`, error);
        return { 
          url,
          isValid: false,
          error: error.message || 'Unknown error',
          retryUrl: url.replace(/http:/, 'https:') // 自动重试HTTPS
        };
      }
    })
  );

  return {
    valid: validationResults.filter(r => r.isValid),
    invalid: validationResults.filter(r => !r.isValid)
  };
};

export const validateImage = (file, { maxSize = 5, allowedTypes = ['image/jpeg', 'image/png'] } = {}) => {
  if (!allowedTypes.includes(file.type)) {
    throw new Error('仅支持 JPEG/PNG 格式');
  }
  
  if (file.size > maxSize * 1024 * 1024) {
    throw new Error(`文件大小不能超过 ${maxSize}MB`);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.width < 800 || img.height < 600) {
        throw new Error('图片分辨率至少需要 800x600 像素');
      }
      resolve(true);
    };
    img.src = URL.createObjectURL(file);
  });
};

export { validateImageUrl, validateImageDimensions }; 