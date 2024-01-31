var { existsSync } = require('fs');
var { join } = require('path');
var { execSync } = require('child_process');

var cli = join(__dirname, 'dist', 'mld.js');
var rebuild = process.argv[2] === 'rebuild';
if (!existsSync(cli) || rebuild) {
  execSync('yarn build');
}
if (!rebuild) {
  require(cli).main();
}
