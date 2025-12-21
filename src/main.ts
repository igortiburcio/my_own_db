import { InputBuffer } from './types/input_buffer';
import { close_input, read_input } from './utils/terminalUtils';
import { MetacommandHandler } from './commands_handlers/metacommand_handler';
import { MetaCommandResult } from './enum/meta_command.enum';

async function main() {
  const input_buffer = new InputBuffer();
  const metacommand_handler = new MetacommandHandler();

  while (true) {
    await read_input(input_buffer);

    if (input_buffer.buffer[0] === '.') {
      const meta_command = metacommand_handler.execute(input_buffer);

      switch (meta_command) {
        case MetaCommandResult.META_COMMAND_SUCCESS: {
          continue;
        }

        case MetaCommandResult.META_COMMAND_UNRECOGNIZED: {
          console.log(`Unrecognized command: '${input_buffer.buffer}'`);
          continue;
        }
      }
    }
  }
}

main();
