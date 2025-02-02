class DownloadHandler {
  constructor() {
    this.initDownloadButtons();
  }

  initDownloadButtons() {
    document.querySelectorAll('[data-download]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleDownload(btn.dataset.download);
        this.addRippleEffect(e);
      });
    });
  }

  handleDownload(platform) {
    const urls = {
      windows: {
        '64位安装包': '/downloads/workgen_windows_x64.exe',
        '便携版': '/downloads/workgen_windows_portable.zip'
      },
      macos: {
        'Intel 芯片版': '/downloads/workgen_macos_intel.dmg',
        'Apple 芯片版': '/downloads/workgen_macos_arm.dmg'
      }
    };

    this.showPlatformSelector(platform, urls[platform]);
  }

  showPlatformSelector(platform, versions) {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h3>选择${platform === 'windows' ? 'Windows' : 'macOS'}版本</h3>
        ${Object.entries(versions).map(([name, url]) => `
          <a href="${url}" class="download-option" download>
            ${name}
            <span class="file-size">${this.getFileSize(url)}</span>
          </a>
        `).join('')}
      </div>
    `;

    document.body.appendChild(modal);
    this.addModalBehavior(modal);
  }

  addRippleEffect(e) {
    const btn = e.currentTarget;
    const ripple = document.createElement('div');
    const rect = btn.getBoundingClientRect();
    
    ripple.style.cssText = `
      width: ${rect.width}px;
      height: ${rect.width}px;
      left: ${e.clientX - rect.left - rect.width/2}px;
      top: ${e.clientY - rect.top - rect.width/2}px;
    `;
    
    ripple.classList.add('ripple-effect');
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  getFileSize(url) {
    // 这里可以添加实际文件大小获取逻辑
    return url.includes('.exe') ? '82.5 MB' : 
           url.includes('.zip') ? '78.3 MB' :
           url.includes('.dmg') ? '91.2 MB' : '-- MB';
  }

  addModalBehavior(modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modal.remove();
    });
  }

  startDownload(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = true;
    
    const progress = this.createProgressIndicator();
    const xhr = new XMLHttpRequest();
    
    xhr.responseType = 'blob';
    xhr.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        progress.style.width = `${percent}%`;
      }
    };
    
    xhr.onload = () => {
      link.href = URL.createObjectURL(xhr.response);
      link.click();
      progress.remove();
    };
    
    xhr.open('GET', url);
    xhr.send();
  }

  createProgressIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'download-progress';
    document.body.appendChild(indicator);
    return indicator;
  }
}

new DownloadHandler(); 