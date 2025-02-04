const IMAGE_PATHS = {
    logo: './assets/images/logo/logo.svg',
    fallback: './assets/images/fallback.png',
    preview: {
        reportList: './assets/images/preview/report-list.jpg',
        smartTodo: './assets/images/preview/smart-todo.jpg',
        statistics: './assets/images/preview/statistics.jpg',
        reportGen: './assets/images/preview/automation-report-generation.jpg'
    }
};

export function validateImages() {
    Object.values(IMAGE_PATHS.preview).forEach(path => {
        const img = new Image();
        img.onload = () => console.log(`图片加载成功: ${path}`);
        img.onerror = () => console.error(`图片加载失败: ${path}`);
        img.src = path;
    });
}

export { IMAGE_PATHS }; 