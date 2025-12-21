import { InputBuffer } from './types/input_buffer';
import { close_input, read_input } from './utils/terminalUtils';
import { CommandHandler } from './commands_handlers/metacommand_handler';
import { MetaCommand } from './enum/meta_command.enum';

async function main() {
  const input_buffer = new InputBuffer();
  const command_handler = new CommandHandler();

  while (true) {
    await read_input(input_buffer);

    if (input_buffer.buffer[0] === '.') {
      const meta_command = command_handler.execute(input_buffer);

      switch (meta_command) {
        case MetaCommand.META_COMMAND_SUCCESS: {
          continue;
        }

        case MetaCommand.META_COMMAND_UNRECOGNIZED: {
          console.log(`Unrecognized command: '${input_buffer.buffer}'`);
          continue;
        }
      }
    }
  }
}

main();
