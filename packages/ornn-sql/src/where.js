import { jsType, nameEsc, valueEsc, wrapInBrackets } from './helpers';

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

const isComplexExpr = target => target.connector && target.clauses;

class WhereClause {
  constructor(config) {
    if (jsType(config) !== 'Object') {
      throw new Error('invalid config');
    }

    this.sql = this.parseConfig(config);
  }

  tables = [];

  isCondition = target => target.name && target.operator && target.value;

  // TODO subqueries
  parseValue = value => valueEsc(value);

  parseSingleClause = ({ name, operator, value, from }) => {
    let columnName = nameEsc(name);

    if (from) {
      this.tables.push(from);
      columnName = `${nameEsc(from)}.${nameEsc(name)}`;
    }

    return `${columnName} ${operator} ${this.parseValue(value)}`;
  };

  parseConfig = config =>
    isComplexExpr(config)
      ? wrapInBrackets(
          config.clauses
            .map(this.parseConfig)
            .join(` ${config.connector.toUpperCase()} `)
        )
      : this.parseSingleClause(config);
}

export default WhereClause;
