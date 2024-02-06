import { loadConfig } from './config';
import { compose, prune } from './docker';

export function main(): string[] | void {
  if (process.argv.length < 3) {
    console.log('Enter a command. Use mld help for available commands.');
  }
  const config = loadConfig();
  const command = process.argv[2];
  const args = process.argv.slice(3);
  const arg0 = args[0];
  switch (command) {
    case 'up':
      compose(['up', '-d'], config.getAppDir(arg0));
      break;
    case 'down':
      compose(['down', '-v'], config.getAppDir(arg0));
      break;
    case 'build':
      compose(['build'], config.getAppDir(arg0));
      break;
    case 'prune':
      prune(['--volumes', '--force']);
      break;
    case 'clear':
      prune(['--all', '--volumes', '--force']);
      break;
    default: {
      console.log('mld up [app=main]: create and start a compose app');
      console.log('mld down [app=main]: stop and remove a compose app');
      console.log('mld build [app=main]: build a compose app');
      console.log('mld prune: deletes unused local docker data');
      console.log('mld clear: delete all local docker data');
      break;
    }
  }
}
