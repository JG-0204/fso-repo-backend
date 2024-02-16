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
      cy.get('[data-cy="username"]').type('ssss');
      cy.get('[data-cy="password"]').type('ssss');

      cy.get('[data-cy="login"]').click();

      cy.contains('ssss logged in').should('exist');
    });

    it('fails with wrong credentials', function () {
      cy.get('[data-cy="username"]').type('ssss');
      cy.get('[data-cy="password"]').type('invalidpassword');

      cy.get('[data-cy="login"').click();

      cy.get('[data-cy="notif"]').should('be.visible');
      cy.get('[data-cy="notif"]').should(
        'have.css',
        'border-color',
        'rgb(255, 0, 0)'
      );
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ssss', password: 'ssss' });
    });

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'A blog title',
        author: 'A blog author',
        url: 'A url',
      });

      cy.get('[data-cy="blog"]').as('blog');

      cy.get('@blog').should('exist');
      cy.get('@blog').should('have.length', 1);
      cy.get('@blog').should('contain', 'A blog title');
      cy.get('@blog').should('contain', 'A blog author');
      cy.get('[data-cy="viewBlog"]').should('exist');
    });

    describe('When there is 1 or more blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'A blog title',
          author: 'A blog author',
          url: 'A url',
        });
      });

      it('A user can like a blog', function () {
        cy.get('[data-cy="viewBlog"]').click();
        cy.get('[data-cy="likeBlog"]').click();

        cy.contains('1').should('exist');
      });

      it('A user that created a blog, can delete a blog', function () {
        cy.get('[data-cy="blog"]').as('blog');

        // click view button
        cy.get('[data-cy="viewBlog"]').click();

        // check the name of the user who added the blog
        cy.get('@blog').should('contain', 'ssss');

        // deleting a blog
        cy.get('[data-cy="removeBlog"]').click();
        cy.get('@blog').should('not.exist');
      });

      it('user can only see remove button if user created the blog', function () {
        cy.get('[data-cy="blog"]').as('blog');
        cy.get('[data-cy="viewBlog"]').as('viewBtn');

        // logout curr user
        cy.contains('logout').click();

        // login other user
        cy.login({ username: 'dddd', password: 'dddd' });

        // check if curr user created the blog if not then check if it has remove button
        cy.get('@blog').should('exist');
        cy.get('@viewBtn').eq(0).click();

        cy.get('@blog').contains('dddd').should('not.exist');
        cy.get('@blog').find('button').contains('remove').should('not.exist');

        // create new blog
        cy.createBlog({
          title: 'A blog title',
          author: 'A blog author',
          url: 'A url',
        });

        // check if it the creator is the curr user and if it has remove button
        cy.get('@viewBtn').eq(1).click();
        cy.get('@blog').contains('dddd').should('exist');
        cy.get('[data-cy="removeBlog"]').should('exist');
      });

      it('Blog is ordered by most likes', function () {
        // create new blog
        cy.createBlog({
          title: 'A blog title with more likes',
          author: 'A blog author',
          url: 'A blog url',
        });

        cy.get('[data-cy="viewBlog"]').eq(1).click();
        cy.get('[data-cy="likeBlog"]').click();
        cy.get('[data-cy="blog"]')
          .eq(0)
          .should('contain', 'A blog title with more likes');
      });
    });
  });
});
