import type { SQLCommandStatementType } from '../enum/sql_command_statement.enum';
import type { Row } from './sql_table';

export class SQLStatement<T extends Record<string, unknown>> {
  type: SQLCommandStatementType | null = null;
  row_to_insert: Row<T> | null = null;
}
