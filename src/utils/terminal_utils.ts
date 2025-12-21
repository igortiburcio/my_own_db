import * as readline from 'readline';
import type { InputBuffer } from '../types/input_buffer';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function read_input(inputBuffer: InputBuffer): Promise<void> {
  return new Promise(resolve => {
    rl.question('db > ', line => {
      inputBuffer.buffer = line;
      inputBuffer.input_length = Array.from(line).length;
      inputBuffer.buffer_length = Buffer.byteLength(line, 'utf8');
      resolve();
    });
  });
}

export function close_input(): void {
  rl.close();
}
