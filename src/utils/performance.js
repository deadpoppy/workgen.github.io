// 添加性能监控
export const performanceMonitor = {
  measurePageLoad: () => {
    const performance = window.performance;
    if (performance) {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      console.log(`页面加载时间: ${loadTime}ms`);
    }
  }
}; 