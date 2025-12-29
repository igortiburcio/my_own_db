import { InputBuffer } from './types/input_buffer';
import { read_input } from './utils/terminal_utils';
import { MetacommandHandler } from './commands_handlers/metacommand_handler';
import { MetaCommandResult } from './enum/meta_command.enum';
import { SQLCommandHandler } from './commands_handlers/sql_command_handler';
import { SQLStatement } from './types/sql_statement';
import type { UserRow } from './types/hard_coded_tables/user_table';
import { SQLStatementStatus } from './enum/sql_command_statement.enum';
import { SQLParser } from './engine/sql_parser';
import { SQLExecutor } from './engine/sql_executor';

async function main() {
  const input_buffer = new InputBuffer();
  const metacommand_handler = new MetacommandHandler();
  const sqlParser = new SQLParser();
  const sqlExecutor = new SQLExecutor();
  const sql_command_handler = new SQLCommandHandler(sqlParser, sqlExecutor);

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

    const statement = new SQLStatement<UserRow>();
    const prepare_status = sql_command_handler.prepare_statement(input_buffer, statement);

    switch (prepare_status) {
      case SQLStatementStatus.PREPARE_SUCCESS: {
        break;
      }

      case SQLStatementStatus.PREPARE_UNRECOGNIZED_STATEMENT: {
        console.log(`Unrecognized keyword at start of: '${input_buffer.buffer}'`);
        continue;
      }
    }

    sql_command_handler.execute_statement(statement);
    console.log('EXECUTED');
  }
}

main();
