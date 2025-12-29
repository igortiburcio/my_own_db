import { SQLCommandStatementType, SQLStatementStatus } from '../enum/sql_command_statement.enum';
import type { SQLStatement } from '../types/sql_statement';
import { sscanf } from '../utils/string_utils';

export class SQLParser {
  parse<T extends Record<string, unknown>>(
    input: string,
    statement: SQLStatement<T>
  ): SQLStatementStatus {
    if (input.startsWith('insert')) {
      return this.prepare_insert(input, statement);
    }

    if (input.startsWith('select')) {
      return this.prepare_select(input, statement);
    }

    return SQLStatementStatus.PREPARE_UNRECOGNIZED_STATEMENT;
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

  private prepare_select<T extends Record<string, unknown>>(
    input: string,
    statement: SQLStatement<T>
  ): SQLStatementStatus {
    statement.type = SQLCommandStatementType.STATEMENT_SELECT;
    return SQLStatementStatus.PREPARE_SUCCESS;
  }
}
