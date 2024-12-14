describe("MovieList Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it('Navigating to "/" displays a search form and a list of movies', () => {
    cy.get("form").should("exist");
    cy.get('[data-testid="cy-movie-list"]').should("exist");
  });

  it("Entering a search query updates URL and refreshes movie list", () => {
    cy.get('[data-testid="cy-search-input"]').type("Alex");
    cy.get('[data-testid="cy-search-submit"]').click();
    cy.url().should("include", "search=Alex");
    cy.get('[data-testid="cy-movies-count"]').should("contain", "movies found");
  });

  it('Navigating to "/?search=alex" displays search form with "alex" and correct movie list', () => {
    cy.visit("http://localhost:5173/?search=alex");
    cy.get('[data-testid="cy-search-input"]').should("have.value", "alex");
    cy.get('[data-testid="cy-movies-count"]').should("contain", "movies found");
  });

  it("Selecting a genre updates URL and refreshes movie list", () => {
    cy.get('[data-testid="cy-genre-select-item"]')
      .contains("Comedy")
      .should("exist")
      .click();
    cy.url().should("include", "filter=comedy");
    cy.get('[data-testid="cy-movies-count"]').should("contain", "movies found");
  });

  it('Navigating to "/?filter=comedy" displays selected genre and relevant movies', () => {
    cy.visit("http://localhost:5173/?filter=comedy");
    cy.get('[data-testid="cy-genre-select-item"]')
      .contains("Comedy")
      .invoke("attr", "class")
      .should("contain", "active");
    cy.get('[data-testid="cy-movies-count"]').should("contain", "movies found");
  });

  it("Selecting sorting by title updates URL and refreshes movie list", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="cy-sort-dropdown"]').select("title");
    cy.url().should("include", "sortBy=title");
    cy.reload();
    cy.get('[data-testid="cy-movie-title"]').then(($titles) => {
      const titles = $titles.map((i, el) => Cypress.$(el).text()).get();
      const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
      expect(titles).to.deep.equal(sortedTitles);
    });
  });

  it('Navigating to "/?sortBy=title" displays movies sorted by title', () => {
    cy.visit("http://localhost:5173/?sortBy=title");
    cy.url().should("include", "sortBy=title");
    cy.get('[data-testid="cy-movie-title"]').then(($titles) => {
      const titles = $titles.map((i, el) => Cypress.$(el).text()).get();
      const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
      expect(titles).to.deep.equal(sortedTitles);
    });
  });

  it("Navigating to multiple query parameters updates UI accordingly", () => {
    cy.visit("http://localhost:5173/?search=alex&filter=comedy&sortBy=title");
    cy.get('[data-testid="cy-search-input"]').should("have.value", "alex");
    cy.get('[data-testid="cy-genre-select-item"]').contains("Comedy");
    cy.get('[data-testid="cy-sort-dropdown"]').should("have.value", "title");
    cy.get('[data-testid="cy-movies-count"]').should("contain", "movies found");
  });

  it("Clicking on a movie updates URL and preserves query params", () => {
    cy.visit("http://localhost:5173/?search=alex&filter=comedy&sortBy=title");
    cy.get('[data-testid="cy-movie-tile"]').first().click();
    cy.url().should("match", /\/\d+\?search=alex&filter=comedy&sortBy=title/);
    cy.get('[data-testid="cy-movie-details"]').should("exist");
    cy.get('[data-testid="cy-movies-count"]').should("contain", "movies found");
  });

  it('Navigating to "/:movieId" displays movie details and movie list', () => {
    cy.visit("http://localhost:5173/218778");
    cy.get('[data-testid="cy-movie-details"]').should("exist");
    cy.get('[data-testid="cy-movie-list"]').should("exist");
  });
});
