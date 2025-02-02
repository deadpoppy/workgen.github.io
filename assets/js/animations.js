// 滚动视差效果
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = parseFloat(el.dataset.speed);
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// 卡片悬停检测
document.querySelectorAll('.card-hover').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// 粒子背景动画
function initParticles() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.classList.add('background-canvas');
  document.body.prepend(canvas);

  let particles = [];
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.velocity = { x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5 };
      this.alpha = Math.random() * 0.5 + 0.5;
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.velocity.x;
      p.y += p.velocity.y;
      if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) p.reset();
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: 100 }, () => new Particle());
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
}

// 在DOM加载后调用
document.addEventListener('DOMContentLoaded', initParticles);

// 在initParticles后添加
function initParallaxLayers() {
  const layers = document.querySelectorAll('.parallax-layer');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    layers.forEach(layer => {
      const depth = layer.dataset.depth || 0.3;
      const offset = scrolled * depth;
      layer.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  });
}

// 初始化调用
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initParallaxLayers();
});

const animationController = new ScrollMagic.Controller();

document.querySelectorAll('.animate-section').forEach(section => {
  new ScrollMagic.Scene({
    triggerElement: section,
    triggerHook: 0.8
  })
  .setClassToggle(section, 'visible')
  .addTo(animationController);
});

function addRippleEffect(btn) {
  btn.addEventListener('click', function(e) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    ripple.style.cssText = `
      width: ${rect.width}px;
      height: ${rect.width}px;
      left: ${e.clientX - rect.left - rect.width/2}px;
      top: ${e.clientY - rect.top - rect.width/2}px;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      position: absolute;
      animation: ripple 0.6s ease-out;
    `;

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

document.querySelectorAll('.btn').forEach(addRippleEffect); 