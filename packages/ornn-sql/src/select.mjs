import { nameEsc } from './helpers';

const isFieldConfig = (config: any): boolean %checks => !!config.name;

class Select {
  tables: string[] = [];
  alias: string[] = [];
  sql: string = '';

  constructor(config: SelectConfig) {
    this.sql = Array.isArray(config)
      ? config.map(this.parseConfig).join(', ')
      : this.parseConfig(config);
  }

  parseConfig = (config: FieldConfig | string): string => {
    if (typeof config === 'string') {
      return nameEsc(config);
    }
    if (isFieldConfig(config)) {
      return this.parseObject(config);
    }
    throw new Error('invalid');
  };

  parseObject = ({ name, as, from }: FieldConfig): string => {
    if (!name) {
      throw new Error('need name');
    }

    let columnName = nameEsc(name);

    if (from) {
      this.tables.push(from);
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
