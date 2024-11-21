## Project

The project I chosen was a simple CRUD app, this app read the data from a backend and display it in the frontend, users can then create/add, update or delete items.

### Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked?

There's a bunch of linting libraries in python like flake8, pytype, sonar and many more, for this project I'll choose pylint, pylint is popular and in the article I read it can also
be automated for CI/CD pipelines.

For testing I've chosen pytest for the same reason that it is popular and I also did a quick read in pytest documentation and I think it's similar to
the test runner of Javascript, specifically the group multiple tests in a class, I think it similar to the describe function of the testing libraries of Javascript.

There is no building tools for python like the course said, but I read in an article that it is possible but as of now there is no building tools for python.

### What alternatives are there to set up the CI besides Jenkins and GitHub Actions?

There are many alternatives for setting up CI other than Github Actions and Jenkins, in the article I read they have GitLab, which I think is different from Github Actions,
Atlassian Bamboo which I think is self-hosted, Cloudomation, which is good for Python projects, Spinnaker, CircleCI and many more.

If I were to choose one I think Cloudomation and Azure DevOps are my choices.

### Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

As I read in the course if the project doesn't use the GPU for testing then the cloud-based environment is sufficient. Because the app is a simple CRUD app, the only thing I need to
test is if the data is successfully updating the database or the backend.
