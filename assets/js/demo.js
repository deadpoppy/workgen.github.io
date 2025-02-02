class DemoLauncher {
  constructor() {
    this.modal = null;
    this.initDemoButton();
  }

  initDemoButton() {
    document.querySelector('.demo-btn').addEventListener('click', (e) => {
      e.preventDefault();
      this.showDemoModal();
    });
  }

  showDemoModal() {
    this.modal = document.createElement('div');
    this.modal.className = 'demo-modal';
    this.modal.innerHTML = `
      <div class="modal-content">
        <iframe src="/demo" loading="lazy"></iframe>
        <button class="close-btn">&times;</button>
      </div>
    `;
    
    document.body.appendChild(this.modal);
    this.addModalEvents();
  }

  addModalEvents() {
    this.modal.querySelector('.close-btn').addEventListener('click', () => {
      this.modal.remove();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.modal.remove();
    });
  }
}

new DemoLauncher(); 