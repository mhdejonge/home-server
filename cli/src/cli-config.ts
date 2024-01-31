import { readFileSync } from 'fs';
import { join } from 'path';

export class CliConfig {
  private baseDir: string;
  private appDirs: Record<string, string>;

  public static load(): CliConfig {
    const config = JSON.parse(readFileSync(join(__dirname, '..', 'config.json')) as any);
    return Object.assign(new CliConfig(), config);
  }

  getAppDir(app: string): string {
    app = app?.toLowerCase() || 'main';
    return join(this.baseDir, this.appDirs[app]);
  }
}
