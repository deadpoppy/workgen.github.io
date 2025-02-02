class DownloadManager {
  constructor() {
    this.initDownloadButtons();
  }

  initDownloadButtons() {
    document.querySelectorAll('.download-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.showDownloadOptions(btn.dataset.platform);
      });
    });
  }

  showDownloadOptions(platform) {
    const options = {
      windows: {
        title: 'Windows 版本下载',
        versions: ['64位安装包', '便携版']
      },
      macos: {
        title: 'macOS 版本下载',
        versions: ['Intel 芯片版', 'Apple 芯片版']
      }
    };

    this.createModal(options[platform]);
  }

  createModal({title, versions}) {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>${title}</h3>
        <div class="version-list">
          ${versions.map(v => `<button class="version-btn">${v}</button>`).join('')}
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.addModalEvents(modal);
  }

  addModalEvents(modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('version-btn')) {
        this.startDownload(e.target.textContent);
      }
      modal.remove();
    });
  }

  startDownload(version) {
    // 实际下载逻辑
    console.log(`开始下载: ${version}`);
  }
}

new DownloadManager(); 