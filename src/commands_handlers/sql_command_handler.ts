import { SQLStatementStatus, SQLCommandStatementType } from '../enum/sql_command_statement.enum';
import type { InputBuffer } from '../types/input_buffer';
import type { SQLStatement } from '../types/sql_statement';
import { SQLParser } from '../engine/sql_parser';
import { SQLExecutor } from '../engine/sql_executor';

export class SQLCommandHandler {
  constructor(
    private sqlParser: SQLParser,
    private sqlExecutor: SQLExecutor
  ) {}

  prepare_statement<T extends Record<string, unknown>>(
    input_buffer: InputBuffer,
    statement: SQLStatement<T>
  ): SQLStatementStatus {
    const input = input_buffer.buffer;

    return this.sqlParser.parse(input, statement);
  }

  execute_statement<T extends Record<string, unknown>>(statement: SQLStatement<T>): void {
    this.sqlExecutor.execute(statement);
  }
}
