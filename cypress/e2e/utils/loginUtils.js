export const login = () => {
  cy.visit('/login');

  cy.get('[data-testid="username"]').type('username');
  cy.get('[data-testid="password"').type('password');
  cy.get('[data-testid="login-button"').click();
  cy.url().should('include', '/'); // Ensure the user is redirected
};
