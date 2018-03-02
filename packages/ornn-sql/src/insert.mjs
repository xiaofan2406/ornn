/* @flow */
import { nameEsc, valueEsc, arrayEsc, isVoid } from './helpers';

class Insert {
  +tableName: string = '';
  +sql: string = '';

  constructor(config: InsertConfig) {
    this.tableName = config.tableName;
    this.sql = this.parseData(config.data);
  }

  +parseData = (data: Object): string => {
    const values = Object.values(data)
      .filter(value => !isVoid(value))
      .map(value => (Array.isArray(value) ? arrayEsc(value) : valueEsc(value)))
      .join(', ');
    const columns = Object.keys(data)
      .filter(key => !isVoid(data[key]))
      .map(nameEsc)
      .join(', ');

    const tableName = nameEsc(this.tableName);
    return `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
  };
}

export default Insert;
