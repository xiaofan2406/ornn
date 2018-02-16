import { nameEsc, valueEsc, wrapInBrackets } from './helpers';

export type Condition = {
  name: string;
  operator: string;
  value: any;
  from?: string;
};

export type Clause = {
  connector: string;
  clauses: (Clause | Condition)[];
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

const isClause = (target: any): target is Clause =>
  target.connector && !!target.clauses;

const isCondition = (target: any): target is Condition =>
  target.name && target.operator && !!target.value;

class Where {
  tables: string[] = [];
  sql: string = '';

  constructor(config: Condition | Clause) {
    if (isClause(<Clause>config) || isCondition(<Condition>config)) {
      this.sql = this.parseConfig(config);
    }
    throw new Error('invalid config');
  }

  // TODO subqueries
  parseValue(value: string): string {
    return valueEsc(value);
  }

  parseCondition({ name, operator, value, from }: Condition): string {
    let columnName = nameEsc(name);

    if (from) {
      this.tables.push(from);
      columnName = `${nameEsc(from)}.${nameEsc(name)}`;
    }

    return `${columnName} ${operator} ${this.parseValue(value)}`;
  }

  parseConfig(config: Condition | Clause): string {
    if (isCondition(config)) {
      return this.parseCondition(config);
    }
    return wrapInBrackets(
      config.clauses
        .map(this.parseConfig)
        .join(` ${config.connector.toUpperCase()} `)
    );
  }
}

export default Where;
