var { existsSync } = require('fs');
var { join } = require('path');
var { execSync } = require('child_process');

var cli = join(__dirname, 'dist', 'index.js');
var rebuild = process.argv[2] === 'rebuild';
if (!existsSync(cli) || rebuild) {
  execSync('yarn build', { cwd: __dirname });
}
if (!rebuild) {
  require(cli).main();
}
