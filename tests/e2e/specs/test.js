// https://docs.cypress.io/api/introduction/api.html

describe('Frankie Case Study', () => {
  it('Visits the login page', () => {
    cy.visit('/')
    cy.contains('h1', 'Sign In')
  })

  it('Can sign in', () => {
    cy.get('#email').type('michael.lawson@reqres.in')
    cy.get('#password').type('123')
    cy.get('button').click() 
    cy.wait(2000)
    cy.get('.success li').contains('Login successful!')
  })

  it('Visits the reset page', () => {
    cy.get('.resetPassword a').click() 
    cy.contains('h1', 'Reset Password')
  })

  it('Can reset password', () => {
    cy.get('#newPassword').type('123')
    cy.get('#confirmPassword').type('123')
    cy.get('button').click() 
    cy.wait(2000)
    cy.get('.success li').contains('Reset password successful!')
  })
})
