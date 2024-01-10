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

    it('fails with wrong credentials', function () {
      cy.get('#username').type('ssss');
      cy.get('#password').type('invalidpassword');

      cy.get('button').click();

      cy.get('#notif').should('be.visible');
      cy.get('#notif').should('have.css', 'border-color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('ssss');
      cy.get('#password').type('ssss');

      cy.get('button').click();
    });

    it('A blog can be created', function () {
      cy.get('#newBlogBtn').click();

      cy.get('#titleInput').type('A blog title');
      cy.get('#authorInput').type('A blog author');
      cy.get('#urlInput').type('A blog url');

      cy.get('#addBlogBtn').click();

      cy.get('.blog').should('exist');
      cy.get('.blog').contains('A blog title').should('exist');
      cy.get('.blog').contains('A blog author').should('exist');
      cy.get('.blog').find('button').contains('view').should('exist');
    });

    describe('When there is 1 or more blog', function () {
      beforeEach(function () {
        cy.get('#newBlogBtn').click();

        cy.get('#titleInput').type('A blog title');
        cy.get('#authorInput').type('A blog author');
        cy.get('#urlInput').type('A blog url ');

        cy.get('#addBlogBtn').click();
      });

      it('A user can like a blog', function () {
        cy.get('.blog').find('button').contains('view').click();
        cy.contains('like').click();

        cy.contains('1').should('exist');
      });

      it('A user that created a blog, can delete a blog', function () {
        cy.get('.blog').find('button').click();

        // check the name of the user who added the blog
        cy.get('.blog').contains('ssss').should('exist');

        // deleting a blog
        cy.get('.blog').find('button').contains('remove').click();

        cy.get('.blog').should('not.exist');
      });
    });
  });
});
