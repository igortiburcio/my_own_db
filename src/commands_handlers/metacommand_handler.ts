import { MetaCommand } from '../enum/meta_command.enum';
import type { InputBuffer } from '../types/input_buffer';

export class CommandHandler {
  constructor() {}

  execute(input_buffer: InputBuffer): MetaCommand {
    if (input_buffer.buffer === '.exit') {
      this.exit();
    }

    return MetaCommand.META_COMMAND_UNRECOGNIZED;
  }

  private exit() {
    process.exit(0);
  }
}
