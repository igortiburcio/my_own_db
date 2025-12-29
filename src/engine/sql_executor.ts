import { SQLCommandStatementType } from '../enum/sql_command_statement.enum';
import type { SQLStatement } from '../types/sql_statement';

export class SQLExecutor {
  execute<T extends Record<string, unknown>>(statement: SQLStatement<T>): void {
    switch (statement.type) {
      case SQLCommandStatementType.STATEMENT_INSERT:
        console.log('This is where we would do an insert.\n');
        break;

      case SQLCommandStatementType.STATEMENT_SELECT:
        console.log('This is where we would do a select.\n');
        break;

      default:
        throw new Error('Unknown statement type');
    }
  }
}
