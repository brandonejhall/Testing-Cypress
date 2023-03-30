describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html') // assuming your calculator HTML is served from the root URL
  })

  it('should return 3 for 1 + 2', () => {
    cy.get('#x').type('1')
    cy.get('#y').type('2')
    cy.get('#add').click()
    cy.get('#result').should('have.text', '3')
  })
})
