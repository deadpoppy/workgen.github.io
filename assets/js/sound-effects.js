class SoundEffects {
  constructor() {
    this.hoverSound = new Audio('/sounds/hover.mp3');
    this.clickSound = new Audio('/sounds/click.mp3');
    this.initButtonEffects();
  }

  initButtonEffects() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => this.playHoverSound());
      btn.addEventListener('click', () => this.playClickSound());
    });
  }

  playHoverSound() {
    this.hoverSound.currentTime = 0;
    this.hoverSound.volume = 0.3;
    this.hoverSound.play();
  }

  playClickSound() {
    this.clickSound.currentTime = 0;
    this.clickSound.volume = 0.5;
    this.clickSound.play();
  }
}

new SoundEffects(); 