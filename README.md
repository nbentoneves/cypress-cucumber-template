# cypress-cucumber-template 🪄

## Motivation

This is a template project for you to have a way to automate the e2e testing process, using cypress and cucumber.

- Why Test End-to-End:

  1. expand test coverage,
  2. ensure expected behavior,
  3. detect bugs.

- Why Test Automation:
  1. cost efficiency,
  2. reduce risk of human error,
  3. increase execution,
  4. improve quality

## Setup

1. Run: `yarn install`
2. Open the project using the `Visual Studio Code` and selecting the file `cypress-cucumber.code-workspace`

## Running

1. `cypress:run` - Run tests using CLI
2. `cypress:open` - Open cypress UI
3. `cucumber:new-feature` - Script to create new feature structure
4. `cucumber:report` - Generate report, after using `cypress:run`

## Project Structure

We are using BDD and cucumber in this project. BDD and cucumber work side by side in a perfect way, they allow you to focus on defining `behavior` rather than defining `tests` and `features` tests can be written by non-technical people because they are written in the `Gherkin` language (business readable). To facilitaty the integration we decided to use [cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) library (it's under MIT license).
If you need to add new test you should respect the following folder structure:

```
├── cypress
│   ├── integration
│   │   ├── common                           #Good place to put reusable step definitions
|   |   |   ├── shared                       #All before/after/then/when shared steps
|   |   ├── end-to-end
|   |   |   ├── <FEATURE_NAME>               #Feature folder. E.g: Search
|   |   |   |   |── <FEATURE_NAME>           #Feature folder name, steps which we want only for a specific feature file
│   │   |   |   ├── <FEATURE_NAME>.feature   #Feature file with the BDD definition
│   ├── plugins
│   ├── support
│   ├── tools                                #Place to have specific tools, such as, script to generate report and folder structure
├── node_modules
├── cypress.json                             #General cypress configuration file
├── cypress.local.json                       #Local environment configuration file
├── cypress.test.json                        #Testing environment configuration file
└── **.*
```

If it is the first time you are working with cucumber you can use the following links to help you out 😎...

- [Gherkin syntax](https://cucumber.io/docs/gherkin/reference/)
- [cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)

## Get report

You can get a HTML report running the following command:

```
yarn cucumber:report
```

## Plugin for VS Code

If you are using vs code you can install [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) and open the project using the `cypress-cucumuber.code-workspace` this will give you a better way to work with BDD/cucumber.

## Config

Cypress config can be found in [cypress.json](cypress.json).

We're using TypeScript (config in [cypress/tsconfig.json](cypress/tsconfig.json)) that is set up to use [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/) for a smoother DOM query experience.

ESlint config can be found in [.eslintrc](.eslintrc) and Prettier config in [.prettierrc](.prettierrc).
