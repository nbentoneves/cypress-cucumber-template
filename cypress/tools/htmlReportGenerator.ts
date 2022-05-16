import * as reporter from 'cucumber-html-reporter';

const options = {
  theme: 'bootstrap',
  jsonFile: 'cucumber-json.json',
  output: './reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    Browser: 'Chrome',
    Executed: 'Remote',
  },
};

reporter.generate(options as reporter.Options);
