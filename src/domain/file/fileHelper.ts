import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

export function writeFile(filename: string, data: string): void {
  fs.writeFileSync(filename, data);
}

export function readFile(filename: string): string {
  return fs.readFileSync(filename, 'utf8');
}

export async function readFileAsync(filename: string): Promise<string> {
  return fsPromises.readFile(filename, 'utf8');
}
