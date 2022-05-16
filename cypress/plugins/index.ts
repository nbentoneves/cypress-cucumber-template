import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { preprocessor } from '@badeball/cypress-cucumber-preprocessor/browserify';
import * as supportExtends from '@bahmutov/cypress-extends';
import * as browserify from '@cypress/browserify-preprocessor';

export default async (
  on: Cypress.PluginEvents, //is used to hook into various events Cypress emits
  config: Cypress.PluginConfigOptions, //is the resolved Cypress config
): Promise<Cypress.PluginConfigOptions> => {
  // Enabling config extension for cypress: https://www.cypress.io/blog/2020/06/18/extending-the-cypress-config-file/
  const configFile = supportExtends(config.configFile);

  on(
    'file:preprocessor',
    preprocessor(config, {
      ...browserify.defaultOptions,
      typescript: require.resolve('typescript'),
    }),
  );

  /**
   *  allow using console.log ui
   *  usage: cy.task('log', {});
   */
  on('task', {
    log: (message) => {
      console.log(message);
      return null;
    },
  });

  // TODO: REMOVE THIS EXAMPLE
  // usage: cy.task('seed');
  on('task', {
    seed: () => {
      //console.log(`seeding database, for env: ${configFile.env.type}`);

      return null;
    },
  });

  await addCucumberPreprocessorPlugin(on, config);

  return {
    ...configFile,
    experimentalSessionSupport: true,
    //browsers: config.browsers.filter((browser) => browser.name === 'chrome'),
  };
};
