import { exit } from 'process';
import yargs from 'yargs';
import colors from 'colors';
import shell from 'shelljs';

const configFilenames = {
  eslint: '.eslintrc',
  prettier: '.prettierrc',
  gitignore: '.gitignore',
  tsconfig: 'tsconfig.json'
};

const configsMap = {
  eslint: {
    'node-api': 'api.eslintrrc'
  },
  prettier: {
    $root: 'default.prettierrc',
    'node-api': 'default.prettierrc'
  },
  gitignore: {
    $root: 'node.gitignore',
    'node-api': 'api.gitignore'
  },
  tsconfig: {
    $root: 'tsconfig.api.json',
    'node-api': 'tsconfig.api.json'
  }
};

var argv = yargs.option('config', { type: 'string', description: 'The name of the configuration to update.' }).alias('c', 'config').help().argv;

const config: string = argv.config;

if (!configsMap[config]) {
  console.error(colors.red(`The provided config (${config}) could not be found.`));
  exit(1);
}

for (const template of Object.keys(configsMap[config])) {
  const pathToReplace = `./templates/${template}/${configFilenames[config]}`;
  const pathToConfigFile = `./configs/${config}/${configsMap[config][template]}`;
  shell.cp('-f', pathToConfigFile, pathToReplace);
}
