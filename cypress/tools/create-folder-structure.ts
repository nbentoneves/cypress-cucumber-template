const Handlebars = require('handlebars');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const fs = require('fs/promises');
const path = require('path');
const inquirer = require('inquirer');

const CYPRESS_BASE_DIR = 'cypress/integration';

const dirExists = async (filePath) => {
  try {
    await fs.stat(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
  return true;
};

const createDirIfNotExists = async (filePath) => {
  const exists = await dirExists(filePath);
  if (!exists) {
    await fs.mkdir(filePath, { recursive: true });
  }
};

const createFolderStructureInteractive = async () => {
  const { featureName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'featureName',
      message: `Which feature do you need to create?`,
      validate(value) {
        if (!value || value.length < 3)
          return 'Name too short. Please use at least 3 characters.';
        if (!/^([A-Z][a-z0-9]*)+$/.test(value))
          return 'Please enter a PascalCased name. eg. SearchGoogle';
        return true;
      },
      default: process.argv[2] ?? undefined,
    },
  ]);

  const structureDir = `${CYPRESS_BASE_DIR}/end-to-end/${featureName}`;
  if ((await dirExists(structureDir)) || (await dirExists(structureDir))) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `A directory already exists at ${structureDir}. Would you like to overwrite it?`,
        default: false,
      },
    ]);
    if (!overwrite) {
      process.exit(0);
    }
  }

  createDirIfNotExists(structureDir);

  const files = await glob('templates/feature-template/**/*', {
    mark: true,
  });

  const templateArgs = { featureName };

  const generateFileForTemplate = async (templateFilePath) => {
    const replacedFilePath = Handlebars.compile(templateFilePath)(templateArgs);
    const isDir = templateFilePath[templateFilePath.length - 1] === path.sep;
    const newFilePath =
      path.join(structureDir, ...replacedFilePath.split(path.sep).slice(2)) +
      (isDir ? '/' : '');

    console.error(`✔ ${newFilePath}`);
    if (isDir) {
      createDirIfNotExists(newFilePath);
    } else {
      const template = await fs.readFile(templateFilePath, 'utf-8');
      const content = Handlebars.compile(template)(templateArgs);
      await fs.writeFile(newFilePath, content);
    }
  };

  await Promise.all(files.map(generateFileForTemplate));

  console.error(`Generated a test structure at "${structureDir}"`);
};

createFolderStructureInteractive().catch((err) => {
  console.error('Something went wrong', err);
  process.exit(1);
});
