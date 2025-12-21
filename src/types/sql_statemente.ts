import type { SQLCommandStatementType } from '../enum/sql_command_statemente.enum';

export class SQLStatement {
  type: SQLCommandStatementType | null = null;

  constructor() {}
}
