import yargs from 'yargs';
import colors from 'colors';
import shell from 'shelljs';

var argv = yargs
  .option('template', { alias: 't', type: 'string', description: 'The name of the template to use.' })
  .alias('t', 'template')
  .check((argv) => {
    if (!argv.template) {
      throw colors.red('Template (--template) is a required flag.');
    }

    return true;
  })
  .option('outDir', { alias: 'o', type: 'string', description: 'The output directory to copy the template to.', default: '~/Documents/Projects' })
  .alias('o', 'outDir')
  .check((argv) => {
    if (!argv.outDir) {
      throw colors.red('OutDir (--outDir) is a required flag.');
    }

    return true;
  })
  .help().argv;

const template = argv.template;
const outDir = argv.outDir;

const templatePath = `./templates/${template}`;

const result = shell.exec(`rsync -avr --exclude=node_modules ${templatePath} ${outDir}`);

if (result.code) {
  console.log(colors.red(`Failed to copy ${template} to ${outDir}.`));
} else {
  console.log(colors.green(`Copied ${template} to ${outDir}.`));
}
