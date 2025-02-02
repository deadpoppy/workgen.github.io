const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4000",
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // 添加插件配置
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
      return config
    },
    defaultCommandTimeout: 30000,
    responseTimeout: 60000
  },
}); 