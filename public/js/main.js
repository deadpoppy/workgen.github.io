// 滚动动画
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.scroll-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// 添加滚动类
function addScrollClasses() {
  const elements = document.querySelectorAll('.section-title, .feature-card, .tech-card, .showcase-item');
  elements.forEach(element => {
    element.classList.add('scroll-reveal');
  });
}

// 添加页面加载进度条
function initProgressBar() {
  const progress = document.createElement('div');
  progress.className = 'page-progress';
  document.body.appendChild(progress);

  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        progress.style.opacity = '0';
        setTimeout(() => progress.remove(), 300);
      }, 200);
    } else {
      width += Math.random() * 30;
      if (width > 100) width = 100;
      progress.style.width = width + '%';
    }
  }, 100);
}

// 添加滚动进度条
function initScrollProgress() {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  progress.appendChild(bar);
  document.body.appendChild(progress);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    bar.style.width = scrolled + '%';
  });
}

// 添加返回顶部按钮
function initBackToTop() {
  const button = document.createElement('div');
  button.className = 'back-to-top';
  button.innerHTML = '↑';
  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 优化图片加载处理
function handleImageLoad(img) {
  const placeholder = document.createElement('div');
  placeholder.className = 'image-placeholder';
  
  // 添加加载状态类
  img.classList.add('loading');
  
  // 设置合适的尺寸
  placeholder.style.aspectRatio = img.getAttribute('width') / img.getAttribute('height');
  
  img.parentNode.insertBefore(placeholder, img);
  
  return new Promise((resolve, reject) => {
    img.onload = () => {
      placeholder.style.opacity = '0';
      img.style.opacity = '1';
      img.classList.remove('loading');
      setTimeout(() => {
        placeholder.remove();
        resolve();
      }, 300);
    };
    
    img.onerror = (error) => {
      handleError(error, 'Image Load');
      img.src = '/images/fallback.png';
      img.classList.remove('loading');
      reject(error);
    };
  });
}

// 更新图片懒加载函数
function handleLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        handleImageLoad(img);
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    img.classList.add('lazy-image');
    imageObserver.observe(img);
  });
}

// 添加滚动指示器
function initScrollIndicator() {
  const sections = document.querySelectorAll('section[id]');
  const indicator = document.createElement('div');
  indicator.className = 'scroll-indicator';
  
  sections.forEach((section, index) => {
    const dot = document.createElement('div');
    dot.className = 'scroll-dot';
    dot.addEventListener('click', () => {
      section.scrollIntoView({ behavior: 'smooth' });
    });
    indicator.appendChild(dot);
  });
  
  document.body.appendChild(indicator);
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    sections.forEach((section, index) => {
      const dot = indicator.children[index];
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  });
}

// 优化主题切换
function initThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', '切换主题');
  themeToggle.innerHTML = '🌓';
  
  // 添加过渡类
  document.documentElement.classList.add('theme-transition');
  
  function setTheme(isDark) {
    document.documentElement.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // 更新 meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#0f172a' : '#3b82f6');
    }
  }
  
  // 处理主题切换时的过渡效果
  document.documentElement.addEventListener('transitionend', () => {
    document.documentElement.classList.remove('theme-transition');
  });
  
  // 检查本地存储的主题设置
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme === 'dark');
  } else {
    setTheme(prefersDark.matches);
  }

  themeToggle.addEventListener('click', () => {
    setTheme(!document.documentElement.classList.contains('dark-theme'));
  });

  // 监听系统主题变化
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches);
    }
  });
}

// 预加载图片
function preloadImages() {
  const imagePaths = [
    '/preview/dashboard.png',
    '/preview/AI周报总结.jpg',
    '/preview/智能代办.jpg',
    '/preview/智能统计.jpg',
    '/preview/日报列表.jpg',
    '/preview/自动化日报生成.jpg'
  ];

  imagePaths.forEach(path => {
    const img = new Image();
    img.src = path;
  });
}

// 添加页面加载完成动画
function initPageLoadAnimation() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-logo">WorkGen</div>
      <div class="loader-progress"></div>
    </div>
  `;
  document.body.appendChild(loader);

  window.addEventListener('load', () => {
    loader.classList.add('loaded');
    setTimeout(() => {
      loader.remove();
      document.body.classList.add('page-loaded');
    }, 500);
  });
}

// 添加鼠标跟随效果
function initMouseFollower() {
  const follower = document.createElement('div');
  follower.className = 'mouse-follower';
  document.body.appendChild(follower);

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;
    
    followerX += dx * 0.1;
    followerY += dy * 0.1;
    
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    
    requestAnimationFrame(animate);
  }

  animate();

  // 添加交互效果
  const interactiveElements = document.querySelectorAll('a, button, .card, .tech-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.transform = 'scale(2)';
      follower.style.opacity = '0.8';
    });
    
    el.addEventListener('mouseleave', () => {
      follower.style.transform = 'scale(1)';
      follower.style.opacity = '0.5';
    });
  });
}

// 性能监控
function initPerformanceMonitoring() {
  // 监控页面加载性能
  window.addEventListener('load', () => {
    const timing = performance.getEntriesByType('navigation')[0];
    console.log('页面加载时间:', timing.loadEventEnd - timing.navigationStart);
    console.log('DOM准备时间:', timing.domContentLoadedEventEnd - timing.navigationStart);
  });

  // 监控资源加载性能
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach(entry => {
      if (entry.initiatorType === 'img') {
        console.log(`图片 ${entry.name} 加载时间:`, entry.duration);
      }
    });
  });
  observer.observe({ entryTypes: ['resource'] });
}

// 优化图片加载策略
function optimizeImageLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  // 使用 Priority Hints
  images.forEach(img => {
    if (img.classList.contains('hero-image')) {
      img.fetchPriority = 'high';
    } else {
      img.fetchPriority = 'low';
    }
    
    // 添加错误处理
    img.onerror = () => {
      img.src = '/images/fallback.png';
      console.error('图片加载失败:', img.dataset.src);
    };
  });
}

// 添加页面可见性处理
function handlePageVisibility() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // 页面不可见时暂停动画
      document.body.classList.add('paused');
    } else {
      // 页面可见时恢复动画
      document.body.classList.remove('paused');
    }
  });
}

// 优化页面加载状态处理
function handlePageLoad() {
  const body = document.body;
  
  // 添加加载状态类
  body.classList.add('loading');
  
  // 监听所有图片加载完成
  const images = document.querySelectorAll('img[data-src]');
  let loadedImages = 0;
  
  function checkAllImagesLoaded() {
    loadedImages++;
    if (loadedImages === images.length) {
      body.classList.remove('loading');
      body.classList.add('page-loaded');
    }
  }
  
  images.forEach(img => {
    if (img.complete) {
      checkAllImagesLoaded();
    } else {
      img.addEventListener('load', checkAllImagesLoaded);
      img.addEventListener('error', checkAllImagesLoaded);
    }
  });
}

// 优化错误处理
function handleError(error, context) {
  console.error(`Error in ${context}:`, error);
  
  // 防止重复显示错误提示
  const existingToast = document.querySelector('.error-toast');
  if (existingToast) return;
  
  const errorToast = document.createElement('div');
  errorToast.className = 'error-toast';
  errorToast.innerHTML = `
    <div class="error-content">
      <span class="error-icon">⚠️</span>
      <span class="error-message">加载出现问题，请刷新页面重试</span>
    </div>
    <button class="error-close">×</button>
  `;
  
  document.body.appendChild(errorToast);
  
  // 添加关闭按钮功能
  errorToast.querySelector('.error-close').addEventListener('click', () => {
    errorToast.remove();
  });
  
  // 自动关闭
  setTimeout(() => {
    if (document.body.contains(errorToast)) {
      errorToast.remove();
    }
  }, 5000);
}

// 更新初始化函数
document.addEventListener('DOMContentLoaded', () => {
  handlePageLoad();
  // 性能优化
  initPerformanceMonitoring();
  optimizeImageLoading();
  handlePageVisibility();
  
  // 已有的初始化代码
  initPageLoadAnimation();
  preloadImages();
  initProgressBar();
  initScrollProgress();
  initBackToTop();
  addScrollClasses();
  handleScrollAnimation();
  handleLazyLoading();
  initScrollIndicator();
  initThemeToggle();
  initMouseFollower();
});

// 添加错误处理
window.addEventListener('error', (e) => {
  console.error('全局错误:', e.message);
  // 可以添加错误上报逻辑
});

// 添加离线支持
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('ServiceWorker 注册成功');
    })
    .catch(error => {
      console.error('ServiceWorker 注册失败:', error);
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}); 