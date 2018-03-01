/* @flow */

import { nameEsc, indent } from './helpers';

class CreateTable {
  tableName: string = '';
  sql: string = '';

  constructor(config: CreateTableConfig) {
    this.tableName = config.tableName;

    this.sql = this.parseConfig(config);
  }

  parseConfig = (config: CreateTableConfig): string => {
    const sql = `CREATE TABLE ${nameEsc(config.tableName)} (\n`;

    return sql.concat(
      config.columns
        .map(this.describeColumn)
        .map(indent())
        .join(', \n')
        .concat('\n);')
    );
  };

  describeColumn = (column: ColumnConfig) =>
    [
      nameEsc(column.name),
      this.getType(column.type),
      this.getDefault(column.default),
      column.required && 'NOT NULL',
      column.unique && 'UNIQUE',
      column.primary && 'PRIMARY KEY',
    ]
      .filter(Boolean)
      .join(' ');

  // TODO validate type, should be one of `./pg-types`
  getType = (type: string): string => type;

  getDefault = (value: ValueDefault): string =>
    typeof value !== 'undefined' ? `DEFAULT ${value}` : '';
}

export default CreateTable;
