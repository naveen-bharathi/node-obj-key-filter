// eslint-disable-next-line import/no-extraneous-dependencies
const shelljs = require('shelljs');
const fs = require('fs');

const command = 'curl -X POST -s --data-urlencode';
const apiURL = 'https://javascript-minifier.com/raw';

shelljs.exec(`${command} 'input@dist/index.js' ${apiURL}`, (_code, output) => {
  fs.writeFileSync('./dist/index.js', output, 'utf8');
});
