import uuid from 'uuid';
import Schema from './packages/ornn-schema/src';
import { CreateTable, PG_TYPES } from './packages/ornn-sql/src';

// const select = {
//   tableName: 'user',
//   select: [{ email: 'mail' }],
//   where: {
//     connector: 'oR',
//     clauses: [{ email: "= 'hello'" }, { password: "= 'yes'" }],
//   },
// };

const schema = new Schema(
  {
    email: {
      type: PG_TYPES.TEXT,
      required: true,
      unique: true,
    },
    username: {
      type: PG_TYPES.VARCHAR(200),
    },
    age: {
      type: PG_TYPES.INTEGER,
    },
    uuid: {
      type: PG_TYPES.UUID,
      default: uuid.v4,
    },
    isActive: {
      type: PG_TYPES.BOOLEAN,
      default: false,
    },
  },
  {
    tableName: 'author',
    defaultId: true,
    timestamp: true,
  }
);

const data = {
  email: 'author@email.com',
  username: 'johnevergreeen',
  unknow: 'cant not see me',
};

// console.log(schema.getValues(data));
console.log(schema.describeTable());
// console.log(CreateTable.describe(schema));
