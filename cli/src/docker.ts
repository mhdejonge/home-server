import { spawn } from 'child_process';

export function docker(args: string[], cwd?: string): void {
  spawn('docker', args, { cwd, stdio: 'inherit' }).on('close', code => {
    if (code) {
      console.error(`${args.join(' ')} exited with code ${code}.`);
    }
  });
}

export function compose(args: string[], cwd?: string): void {
  docker(['compose', ...args], cwd);
}

export function prune(args: string[], cwd?: string): void {
  docker(['system', 'prune', ...args], cwd);
}
