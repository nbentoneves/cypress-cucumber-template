//TODO: REMOVE THIS EXAMPLE
import { DataTable, Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I visit a search page and search for {string}', (profile: string) => {
  cy.basepage('com');

  cy.findByText('I agree').click();
  cy.findByTitle('Search').type(profile);
  cy.findAllByDisplayValue('Google Search').then((elements) => {
    cy.wrap(elements[1]).click();
  });
});

Then('I see the following result', (dataTable: DataTable) => {
  const expectedData = dataTable.rows()[0];
  cy.findByText(
    `${expectedData[0]} - ${expectedData[1]} - ${expectedData[2]} | LinkedIn`,
  );
});
