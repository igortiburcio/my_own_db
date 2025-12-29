import * as readline from 'readline';
import type { InputBuffer } from '../types/input_buffer';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function read_input(input_buffer: InputBuffer): Promise<void> {
  return new Promise(resolve => {
    rl.question('db > ', line => {
      input_buffer.buffer = line;
      input_buffer.input_length = Array.from(line).length;
      input_buffer.buffer_length = Buffer.byteLength(line, 'utf8');
      resolve();
    });
  });
}

export function close_input(): void {
  rl.close();
}
