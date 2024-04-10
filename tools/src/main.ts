import { loadConfig } from './config';
import { compose, prune } from './docker';

export function main(args: string[]): void {
  if (process.argv.length < 1) {
    console.log('Enter a command. Use mld help for available commands.');
  }
  const config = loadConfig();
  const arg1 = args[1];
  switch (args[0]) {
    case 'up':
      compose(['up', '-d'], config.getAppDir(arg1));
      break;
    case 'down':
      compose(['down', '-v'], config.getAppDir(arg1));
      break;
    case 'build':
      compose(['build'], config.getAppDir(arg1));
      break;
    case 'prune':
      prune(['--volumes', '--force']);
      break;
    case 'clean':
      prune(['--all', '--volumes', '--force']);
      break;
    default: {
      console.log('mld up [app=main]: create and start a compose app');
      console.log('mld down [app=main]: stop and remove a compose app');
      console.log('mld build [app=main]: build a compose app');
      console.log('mld prune: deletes unused local docker data');
      console.log('mld clean: delete all local docker data');
      break;
    }
  }
}
