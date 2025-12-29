import { MetaCommandResult } from '../enum/meta_command.enum';
import type { InputBuffer } from '../types/input_buffer';

export class MetacommandHandler {
  execute(input_buffer: InputBuffer): MetaCommandResult {
    if (input_buffer.buffer === '.exit') {
      this.exit();
    }

    return MetaCommandResult.META_COMMAND_UNRECOGNIZED;
  }

  private exit() {
    process.exit(0);
  }
}
