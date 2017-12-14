import { getSelect } from './src/sql';

const select = {
  tableName: 'user',
  select: [{ email: 'mail' }],
  where: {
    connector: 'oR',
    clauses: [{ email: "= 'hello'" }, { password: "= 'yes'" }],
  },
};
console.log(getSelect(select));
