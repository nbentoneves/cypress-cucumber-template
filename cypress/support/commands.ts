import '@testing-library/cypress/add-commands';

//TODO: REMOVE THIS EXAMPLE
Cypress.Commands.add('basepage', (country: string) => {
  const baseUrl = (Cypress.config('baseUrl') as string).split('.');

  cy.visit(`${baseUrl[0]}.${country}`);
});
