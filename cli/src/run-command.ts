import { spawn } from 'child_process';

export function runCommand(args: string[], cwd?: string): void {
  spawn('powershell.exe', args, { cwd, stdio: 'inherit' }).on('close', code => {
    if (code) {
      console.error(`${args.join(' ')} exited with code ${code}.`);
    }
  });
}
