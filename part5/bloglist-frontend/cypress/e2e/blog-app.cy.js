describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

    const testUser = {
      username: 'ssss',
      password: 'ssss',
      name: 'ssss',
    };

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser);

    cy.visit('');
  });

  it('shows Login form', function () {
    cy.contains('username:').should('exist');
    cy.contains('password:').should('exist');

    cy.get('input').should('have.length', 2);

    cy.get('button').should('contain', 'login');
    cy.get('button').should('have.length', 1);

    cy.contains('ssss logged in').should('not.exist');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ssss');
      cy.get('#password').type('ssss');

      cy.get('button').click();

      cy.contains('ssss logged in').should('exist');
    });

    it('fails with wrong credentinals', function () {
      cy.get('#username').type('ssss');
      cy.get('#password').type('invalidpassword');

      cy.get('button').click();

      cy.get('#notif').should('be.visible');
      cy.get('#notif').should('have.css', 'border-color', 'rgb(255, 0, 0)');
    });
  });
});
