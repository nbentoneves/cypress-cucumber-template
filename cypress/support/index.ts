import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * TODO: REMOVE THIS EXAMPLE
       * Command to visit web page
       * @example cy.basepage('com')
       */
      basepage(country: string): Chainable<Element>;
    }
  }
}

beforeEach(() => {
  //cy.task('log', 'execute before each test');
  cy.task('seed');
});

afterEach(() => {
  //cy.task('log', 'execute after each test');
});
