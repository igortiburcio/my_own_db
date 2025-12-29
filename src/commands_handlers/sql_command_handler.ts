import { SQLStatementStatus, SQLCommandStatementType } from '../enum/sql_command_statement.enum';
import type { InputBuffer } from '../types/input_buffer';
import type { SQLStatement } from '../types/sql_statement';
import { sscanf } from '../utils/string_utils';

export class SQLCommandHandler {
  prepare_statement<T extends Record<string, unknown>>(
    input_buffer: InputBuffer,
    statement: SQLStatement<T>
  ): SQLStatementStatus {
    const input = input_buffer.buffer;

    if (input.startsWith('insert')) {
      return this.prepare_insert(input, statement);
    }

    if (input.startsWith('select')) {
      statement.type = SQLCommandStatementType.STATEMENT_SELECT;
      return SQLStatementStatus.PREPARE_SUCCESS;
    }

    return SQLStatementStatus.PREPARE_UNRECOGNIZED_STATEMENT;
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
  ): SQLStatementStatus {
    statement.type = SQLCommandStatementType.STATEMENT_INSERT;

    const args = sscanf(input, /^insert (\d+) (\S+) (\S+)/);

    if (!args || args.length < 3) {
      return SQLStatementStatus.PREPARE_SYNTAX_ERROR;
    }

    for (const arg in args) {
      // @ts-ignore
      statement.row_to_insert![arg] = args[arg];
    }

    return SQLStatementStatus.PREPARE_SUCCESS;
  }
}
