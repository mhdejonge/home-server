import { readFileSync } from 'fs';
import { join } from 'path';

export function loadConfig(): CliConfig {
  const config = JSON.parse(readFileSync(join(__dirname, '..', 'config.json')) as any);
  return Object.assign(new CliConfig(), config);
}

export class CliConfig {
  private baseDir: string;
  private appDirs: Record<string, string>;

  public getAppDir(app: string): string {
    app = app?.toLowerCase() || 'main';
    return join(this.baseDir, this.appDirs[app]);
  }
}
