// 平台切换逻辑
document.querySelectorAll('.platform-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const platform = tab.dataset.platform;
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === platform);
    });
  });
});

// 动态下载统计
document.querySelectorAll('.download-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    ga('send', 'event', 'Download', btn.dataset.platform);
  });
});

// 注册Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker注册成功:', registration.scope);
      })
      .catch(err => {
        console.log('ServiceWorker注册失败:', err);
      });
  });
}

// 暗黑模式切换
document.querySelector('.theme-toggle').addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// 初始化主题
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// 反馈表单交互
const feedbackWidget = document.querySelector('.feedback-widget');
const feedbackTrigger = feedbackWidget.querySelector('.feedback-trigger');
const feedbackForm = feedbackWidget.querySelector('.feedback-form');

feedbackTrigger.addEventListener('click', () => {
  feedbackForm.style.display = feedbackForm.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
  if (!feedbackWidget.contains(e.target)) {
    feedbackForm.style.display = 'none';
  }
});

// 提交反馈
document.querySelector('.submit-btn').addEventListener('click', () => {
  const feedback = document.querySelector('textarea').value;
  if (feedback.length > 10) {
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ message: feedback }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => alert('感谢您的反馈！'))
    .catch(() => alert('提交失败，请稍后再试'));
  }
}); 