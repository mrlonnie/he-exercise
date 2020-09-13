context('RepoDetails', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/jakesgordon/javascript-tetris')
  })

  it('Loads Repo Details Page', () => {
    cy.get('.MuiPaper-root.Mui-expanded > .MuiAccordionSummary-root').should('be.visible')
    cy.get('#repo-raw-details')
      .should('be.visible')
      .should('not.have.class', 'Mui-expanded')
  })

  it('Row Details should not be empty', () => {
    cy.get('#repo-raw-details').click();
    cy.get('pre').should('not.be.empty')
  })

  it('Breadcrump - goes back to search form', () => {
    cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > a').click()
    cy.url().should('eq', 'http://localhost:3000/') 
  })
})