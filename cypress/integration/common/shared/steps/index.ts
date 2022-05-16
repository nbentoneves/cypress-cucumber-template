//TODO: REMOVE THIS EXAMPLE
import { After, Before } from '@badeball/cypress-cucumber-preprocessor';

Before({ tags: '@business' }, () => {
  //cy.task('log', 'execute before when using tag @business');
});

After({ tags: '@business' }, () => {
  //cy.task('log', 'execute after when using tag @business');
});
