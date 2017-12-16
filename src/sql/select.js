import { nameEsc, jsType } from './helpers';

/**
 * select: [''] || { name, as, from} || [{ name, as, from}]
 */
class SelectClause {
  constructor(config) {
    // config is array or a single string
    this.sql =
      jsType(config) === 'Array'
        ? config.map(this.parseConfig).join(', ')
        : this.parseConfig(config);
  }

  tables = [];
  alias = [];

  parseConfig = config => {
    switch (jsType(config)) {
      case 'String':
        return nameEsc(config);
      case 'Object':
        return this.parseObject(config);
      default:
        throw new Error('invalid');
    }
  };

  parseObject = ({ name, as, from }) => {
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

export default SelectClause;
