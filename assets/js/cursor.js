class InteractiveCursor {
  constructor() {
    this.cursor = document.createElement('div');
    this.cursor.classList.add('cursor-dot');
    document.body.appendChild(this.cursor);

    this.follower = document.createElement('div');
    this.follower.classList.add('cursor-follower');
    document.body.appendChild(this.follower);

    this.initTracking();
  }

  initTracking() {
    document.addEventListener('mousemove', (e) => {
      this.cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      this.follower.style.transform = 
        `translate(${e.clientX - 15}px, ${e.clientY - 15}px) scale(${this.getScale()})`;
    });
  }

  getScale() {
    return document.querySelector(':hover')?.matches('.interactive') ? 0.8 : 1;
  }
}

new InteractiveCursor(); 