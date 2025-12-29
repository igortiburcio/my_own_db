import { SQLStatementeStatus, SQLCommandStatementType } from '../enum/sql_command_statemente.enum';
import type { InputBuffer } from '../types/input_buffer';
import type { SQLStatement } from '../types/sql_statemente';
import { sscanf } from '../utils/string_utils';

export class SQLCommandHandler {
  constructor() {}

  prepare_statement<T extends Record<string, unknown>>(
    input_buffer: InputBuffer,
    statement: SQLStatement<T>
  ): SQLStatementeStatus {
    const input = input_buffer.buffer;

    if (input.startsWith('insert')) {
      return this.prepare_insert(input, statement);
    }

    if (input.startsWith('select')) {
      statement.type = SQLCommandStatementType.STATEMENT_SELECT;
      return SQLStatementeStatus.PREPARE_SUCCESS;
    }

    return SQLStatementeStatus.PREPARE_UNRECOGNIZED_STATEMENT;
  }

  execute_statement<T extends Record<string, unknown>>(statement: SQLStatement<T>): void {
    switch (statement.type) {
      case SQLCommandStatementType.STATEMENT_INSERT:
        console.log('This is where we would do an insert.\n');
        break;
      case SQLCommandStatementType.STATEMENT_SELECT:
        console.log('This is where we would do a select.\n');
        break;
    }
  }

  private prepare_insert(
    input: string,
    statement: SQLStatement<Record<string, unknown>>
  ): SQLStatementeStatus {
    statement.type = SQLCommandStatementType.STATEMENT_INSERT;

    const args = sscanf(input, /^insert (\d+) (\S+) (\S+)/);

    if (!args || args.length < 3) {
      return SQLStatementeStatus.PREPARE_SYNTAX_ERROR;
    }

    for (const arg in args) {
      // @ts-ignore
      statement.row_to_insert![arg] = args[arg];
    }

    return SQLStatementeStatus.PREPARE_SUCCESS;
  }
}
