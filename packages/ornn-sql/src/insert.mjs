import { nameEsc, valueEsc } from './helpers';

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

  parseData(data: Object): string {
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
