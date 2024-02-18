import { environment } from 'environments';

export function makeApiPath(path: string): string {
  const baseUri = environment.apiBaseUrl;
  const relativeUri = path.startsWith('/') ? path.substring(1) : path;
  return baseUri ? [baseUri, relativeUri].join('/') : relativeUri;
}
