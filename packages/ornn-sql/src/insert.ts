import { nameEsc, valueEsc } from './helpers';

export type InsertConfig = {
  tableName: string;
  data: object; // TODO object type, not null
};

/**
 * tableName
 * data
 */
class Insert {
  tableName: string = '';
  sql: string = '';

  constructor(config: InsertConfig) {
    this.tableName = config.tableName;

    this.sql = this.parseData(config.data);
  }

  parseData(data: object): string {
    const values = Object.values(data)
      .map(valueEsc)
      .join(', ');
    const columns = Object.keys(data)
      .map(nameEsc)
      .join(', ');

    const tableName = nameEsc(this.tableName);
    return `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
  }
}

export default Insert;
