context('SearchForm', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Loads default search term1 with results', () => {
    cy.get('#search-term').should('have.value', 'tetris');
    cy.get('.MuiPaper-root').should('be.visible')
    cy.get('#search-results').should('be.visible')
  })

  it('Filters by selected language', () => {
    cy.get('#language-filter').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#search-results')
      .find('tr :nth-child(5)')
      .should(($cell) => {
        expect($cell).to.have.length(10)
        expect($cell).to.contain('JavaScript');
      })
  })

  it('Clear Button resets results', () => {
    cy.get('#language-filter').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('.MuiPaper-root > .MuiButtonBase-root').click();
    cy.get('#search-results')
      .find('tr :nth-child(5)')
      .should(($cell) => {
        expect($cell).to.have.length(31)
      })
  })

  it('Details link takes you to details page', () => {
    cy.get(':nth-child(1) > :nth-child(6) > a').click();
    cy.url().should('include', '/jakesgordon/javascript-tetris') 
  })
})