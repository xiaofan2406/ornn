// TODO
import { nameEsc, valueEsc, wrapInBrackets } from './helpers';

type WhereCondition = {
  name: string,
  operator: string,
  value: mixed,
  from?: string,
};

type WhereClause = {
  connector: string,
  clauses: (WhereClause | WhereCondition)[],
};

// (A = 9 AND B < 4) OR D > 8
// const test = {
//   connector: 'OR',
//   clauses: [
//     {
//       connector: 'AND',
//       clauses: [
//         { name: 'A', operator: '=', value: '9' },
//         { name: 'B', operator: '<', value: '4' },
//         { name, operator, value, from },
//       ],
//     },
//     { D: '> 8' },
//   ],
// };

// TODO custom type predicate doesnt yet work https://github.com/facebook/flow/issues/34
const isClause = (target: mixed): %checks =>
  target.connector && !!target.clauses;

const isCondition = (target: mixed): %checks =>
  target.name && target.operator && !!target.value;

class Where {
  tables: string[] = [];
  sql: string = '';

  constructor(config: WhereCondition | WhereClause) {
    if (isClause(config) || isCondition(config)) {
      this.sql = this.parseConfig(config);
    } else {
      throw new Error('invalid config');
    }
  }

  parseConfig = (config: WhereCondition | WhereClause): string => {
    if (isCondition(config)) {
      return this.parseCondition(config);
    }
    return wrapInBrackets(
      config.clauses
        .map(this.parseConfig)
        .join(` ${config.connector.toUpperCase()} `)
    );
  };

  // TODO subqueries
  parseValue = (value: string): string => valueEsc(value);

  parseCondition = ({
    name,
    operator,
    value,
    from,
  }: WhereCondition): string => {
    let columnName = nameEsc(name);

    if (from) {
      this.tables.push(from);
      columnName = `${nameEsc(from)}.${nameEsc(name)}`;
    }

    return `${columnName} ${operator} ${this.parseValue(value)}`;
  };
}

export default Where;
