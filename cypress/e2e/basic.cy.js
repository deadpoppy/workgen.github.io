describe('基础功能测试', () => {
  it('成功加载首页', () => {
    cy.visit('/')
    cy.contains('h1', 'WorkGen').should('be.visible')
  })

  it('暗黑模式切换', () => {
    cy.get('.theme-toggle').click()
    cy.get('body').should('have.class', 'dark-mode')
  })
}) 