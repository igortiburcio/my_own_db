import { SQLStatementeStatus, SQLCommandStatementType } from '../enum/sql_command_statemente.enum';
import type { InputBuffer } from '../types/input_buffer';
import type { SQLStatement } from '../types/sql_statemente';
import { sscanf } from '../utils/string_utils';

export class SQLCommandHandler {
  constructor() {}

  prepare_statement(input_buffer: InputBuffer, statement: SQLStatement): SQLStatementeStatus {
    const input = input_buffer.buffer;

    if (input.startsWith('insert')) {
      statement.type = SQLCommandStatementType.STATEMENT_INSERT;

      const args = sscanf(input, /^insert (\d+) (\S+) (\S+)/);

      if (!args || args.length < 3) {
        return SQLStatementeStatus.PREPARE_SYNTAX_ERROR;
      }

      statement.row_to_insert = {
        id: Number(args[1]),
        username: args[2],
        email: args[3],
      };

      return SQLStatementeStatus.PREPARE_SUCCESS;
    }

    if (input.startsWith('select')) {
      statement.type = SQLCommandStatementType.STATEMENT_SELECT;
      return SQLStatementeStatus.PREPARE_SUCCESS;
    }

    return SQLStatementeStatus.PREPARE_UNRECOGNIZED_STATEMENT;
  }

  execute_statement(statement: SQLStatement): void {
    switch (statement.type) {
      case SQLCommandStatementType.STATEMENT_INSERT:
        console.log('This is where we would do an insert.\n');
        break;
      case SQLCommandStatementType.STATEMENT_SELECT:
        console.log('This is where we would do a select.\n');
        break;
    }
  }
}
