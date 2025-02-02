class ThemeManager {
  constructor() {
    this.themes = {
      light: {
        '--primary': '#667eea',
        '--background': '#ffffff'
      },
      dark: {
        '--primary': '#4c51bf', 
        '--background': '#1a202c'
      }
    };
  }

  setTheme(theme) {
    Object.entries(this.themes[theme]).forEach(([prop, value]) => {
      document.documentElement.style.setProperty(prop, value);
    });
  }
} 