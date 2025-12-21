import { InputBuffer } from './types/input_buffer';
import { close_input, read_input } from './utils/terminal_utils';
import { MetacommandHandler } from './commands_handlers/metacommand_handler';
import { MetaCommandResult } from './enum/meta_command.enum';
import { SQLCommandHandler } from './commands_handlers/sql_command_handler';
import { SQLStatement } from './types/sql_statemente';
import { SQLStatementeStatus } from './enum/sql_command_statemente.enum';

type UserTable = {
  id: number;
  username: string;
  email: string;
};

async function main() {
  const input_buffer = new InputBuffer();
  const metacommand_handler = new MetacommandHandler();
  const sql_command_handler = new SQLCommandHandler();

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

    const statement = new SQLStatement();
    const prepare_status = sql_command_handler.prepare_statement(input_buffer, statement);

    switch (prepare_status) {
      case SQLStatementeStatus.PREPARE_SUCCESS: {
        break;
      }

      case SQLStatementeStatus.PREPARE_UNRECOGNIZED_STATEMENT: {
        console.log(`Unrecognized keyword at start of: '${input_buffer.buffer}'`);
        continue;
      }
    }

    sql_command_handler.execute_statement(statement);
    console.log('EXECUTED');
  }
}

main();
