import { nameEsc } from './helpers';

export type FieldConfig = {
  name: string;
  as?: string;
  from?: string;
};

export type SelectConfig = string[] | FieldConfig | FieldConfig[];

const isFieldConfig = (config: any): config is FieldConfig => !!config.name;

class SelectClause {
  tables: Array<string> = [];
  alias: Array<string> = [];
  sql: string = '';

  constructor(config: SelectConfig) {
    this.sql = Array.isArray(config)
      ? (config as (FieldConfig | string)[]).map(this.parseConfig).join(', ')
      : this.parseConfig(config);
  }

  parseConfig(config: FieldConfig | string): string {
    if (typeof config === 'string') {
      return nameEsc(config);
    }
    if (isFieldConfig(config)) {
      return this.parseObject(config);
    }
    throw new Error('invalid');
  }

  parseObject({ name, as, from }: FieldConfig): string {
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
  }
}

export default SelectClause;
