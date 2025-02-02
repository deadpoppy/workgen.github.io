window.addEventListener('error', (event) => {
  console.error('全局错误捕获:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的Promise拒绝:', event.reason);
}); 