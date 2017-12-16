const columnEsc = str => `"${str}"`;
const valueEsc = str => `'${str}'`;

const getKeyValue = obj => ({
  key: Object.keys(obj)[0],
  value: Object.values(obj)[0],
});

const asSqlString = ({ key, value }) =>
  `${columnEsc(key)} as ${columnEsc(value)}`;
const whereSqlString = (string = '') => (string ? `WHERE ${string}` : '');

// const isValidConnector = (str = '') =>
//   typeof str === 'string' && ['AND', 'OR'].includes(str.toUpperCase());

const isComplexWhereExpr = (expr = {}) => expr.connector && expr.clauses;

const parseCondition = conditon => conditon;

const parseSingleClause = expr => {
  const { key, value } = getKeyValue(expr);
  return `${columnEsc(key)} ${parseCondition(value)}`;
};

const parseWhereExpr = expr => {
  let str = '';
  if (isComplexWhereExpr(expr)) {
    str += '(';
    str += expr.clauses
      .map(parseWhereExpr)
      .join(` ${expr.connector.toUpperCase()} `);
    str += ')';
  } else {
    str += parseSingleClause(expr);
  }
  return str;
};

/**
 * tableName: ''
 * select: [''] || [{ name, as, from}]
 * where: {connector, clause}
 * orderBy: [{ name, ASC|DESC }]
 * @param {*} criteria
 */
export const getSelect = ({ tableName, where, select }) => {
  const selects = select.map(
    single =>
      typeof single === 'string' ? single : asSqlString(getKeyValue(single))
  );

  const wheres = whereSqlString(parseWhereExpr(where));

  return `SELECT ${selects} FROM "${tableName}" ${wheres}`;
};

export const getInsert = json => json;
