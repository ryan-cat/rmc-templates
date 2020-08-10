import yargs from 'yargs';
import colors from 'colors';
import shell from 'shelljs';

const configsMap = require('../configs.map.json');

const configFilenames = {
  eslint: '.eslintrc',
  prettier: '.prettierrc',
  gitignore: '.gitignore',
  tsconfig: 'tsconfig.json'
};

const updateAll = (config: string) => {
  for (let template of Object.keys(configsMap[config])) {
    const configFile = configsMap[config][template];

    const pathToConfigFile = `./configs/${config}/${configFile}`;

    const pathToReplaceStart = template === '.' ? '' : './templates/';
    const pathToReplace = `${pathToReplaceStart}${template}/${configFilenames[config]}`.replace('//', '/');
    const result = shell.cp('-f', pathToConfigFile, pathToReplace);

    if (result.code) {
      console.log(colors.red(`Failed to copy ${pathToConfigFile} to ${pathToReplace}.`));
    } else {
      console.log(colors.green(`Copied ${pathToConfigFile} to ${pathToReplace}.`));
    }
  }
};

var argv = yargs
  .option('config', { alias: 'c', type: 'string', description: 'The name of the configuration to update.' })
  .alias('c', 'config')
  .check((argv) => {
    if (!argv.config) {
      throw colors.red('Config (--config) is a required flag.');
    }

    const config = argv.config;

    if (!configsMap[config]) {
      throw colors.red(`The provided config (${config}) could not be found.`);
    }

    return true;
  }).argv;

const config = argv.config;

updateAll(config);
