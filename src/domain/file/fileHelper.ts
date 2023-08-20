import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';

export function writeFile(filename: string, data: string): void {
  const dirPath = path.dirname(filename);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filename, data);
}

export function readFile(filename: string): string {
  return fs.readFileSync(filename, 'utf8');
}

export async function readFileAsync(filename: string): Promise<string> {
  return fsPromises.readFile(filename, 'utf8');
}
