const { execSync } = require('child_process');

try {
  execSync(`yarn run --silent ng lint --fix`, { stdio: 'inherit' });
} catch {
  // lint errors
}

console.log();

try {
  console.log(`Linting "global and component styles"...`);
  execSync(`yarn run --silent stylelint "**/*.{css,sass,scss}" --ip "dist" --aei --fix`);
  console.log();
  console.log('All files pass linting.');
  console.log();
} catch (error) {
  // lint errors
  switch (error.status) {
    case 1:
    case 2:
      console.log('Lint errors/warnings found in the listed files.');
      break;
  }
  console.log();
}
