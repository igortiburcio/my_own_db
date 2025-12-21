import type { SQLCommandStatementType } from '../enum/sql_command_statemente.enum';

export class SQLStatement {
  type: SQLCommandStatementType | null = null;
  row_to_insert: Record<string, unknown> | null = null;

  constructor() {}
}
