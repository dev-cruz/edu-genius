import * as fs from 'fs';

export function writeFile(filename: string, data: string): void {
  fs.writeFileSync(filename, data);
}

export function readFile(filename: string): string {
  return fs.readFileSync(filename, 'utf8');
}
