require('child_process').execSync('yarn --silent install --frozen-lockfile', {
  cwd: __dirname,
  stdio: 'inherit'
});
require('ts-node').register({ project: __dirname });
require('./src/main').main(process.argv.slice(2));
