try {
  require('child_process').execSync('yarn install --immutable', {
    cwd: __dirname,
    stdio: 'ignore'
  });
} catch {
  console.error('yarn install failed');
  process.exit(1);
}
require('ts-node').register({ project: __dirname });
require('./src/main').main(process.argv.slice(2));
