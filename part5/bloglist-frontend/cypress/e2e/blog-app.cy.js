describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

    const testUser = {
      username: 'ssss',
      password: 'ssss',
      name: 'ssss',
    };

    const testUser2 = {
      username: 'dddd',
      password: 'dddd',
      name: 'dddd',
    };

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser2);

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

      it.only('user can only see remove button if user created the blog', function () {
        // logout curr user
        cy.contains('logout').click();

        // login other user
        cy.get('#username').type('dddd');
        cy.get('#password').type('dddd');
        cy.get('button').click();

        // check if curr user created the blog if not then check if it has remove button
        cy.get('.blog').find('button').click();
        cy.get('.blog').contains('dddd').should('not.exist');
        cy.get('.blog').find('button').contains('remove').should('not.exist');

        // create new blog
        cy.get('#newBlogBtn').click();

        cy.get('#titleInput').type('A blog title ');
        cy.get('#authorInput').type('A blog author ');
        cy.get('#urlInput').type('A blog url ');

        cy.get('#addBlogBtn').click();

        // check if it the creator is the curr user and if it has remove button
        cy.get('.blog').find('button').contains('view').click();
        cy.get('.blog').contains('dddd').should('exist');
        cy.get('.blog').find('button').contains('remove').should('exist');
      });
    });
  });
});
