// TODO
import { nameEsc } from './helpers';

type FieldConfig = {
  name: string,
  as?: string,
  from?: string,
};

type SelectConfig = (FieldConfig | string)[] | FieldConfig | string;

class Select {
  tableNames: string[] = [];
  alias: string[] = [];
  sql: string = '';

  constructor(config: SelectConfig) {
    this.sql = 'SELECT '.concat(this.parseSelect(config));
  }

  parseSelect = (config: SelectConfig): string => {
    if (typeof config === 'string') {
      return config;
    }
    return Array.isArray(config)
      ? config.map(this.parseConfig).join(', ')
      : this.parseField(config);
  };

  parseConfig = (field: FieldConfig | string): string =>
    typeof field === 'string' ? nameEsc(field) : this.parseField(field);

  parseField = ({ name, as, from }: FieldConfig): string => {
    let columnName = nameEsc(name);

    if (from) {
      this.tableNames.push(from);
      columnName = `${nameEsc(from)}.${nameEsc(name)}`;
    }

    if (as) {
      this.alias.push(as);
      columnName = `${columnName} AS ${nameEsc(as)}`;
    }

    return columnName;
  };
}

export default Select;
