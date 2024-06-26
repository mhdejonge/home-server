import { spawn } from 'child_process';
import { existsSync } from 'fs';

export function docker(args: string[], cwd?: string): void {
  if (cwd && !existsSync(cwd)) {
    console.error(`${cwd} does not exist.`);
    process.exit(1);
  }
  spawn('docker', args, { cwd, stdio: 'inherit' }).on('close', code => {
    if (code) {
      console.error(`docker ${args.join(' ')} exited with code ${code}.`);
      process.exit(code);
    }
  });
}

export function compose(args: string[], cwd: string): void {
  docker(['compose', ...args], cwd);
}

export function prune(args: string[]): void {
  docker(['system', 'prune', ...args]);
}
