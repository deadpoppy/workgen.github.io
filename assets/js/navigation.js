class Navigation {
  constructor() {
    this.initNavLinks();
    this.initScrollSpy();
  }

  initNavLinks() {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        this.scrollToSection(targetId);
        this.setActiveLink(link);
      });
    });
  }

  scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  setActiveLink(activeLink) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight/3) {
          current = section.getAttribute('id');
        }
      });
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
}

new Navigation(); 