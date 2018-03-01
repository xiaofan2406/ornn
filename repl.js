import uuid from 'uuid';
import ornn from './packages/ornn-core/src';
import Schema from './packages/ornn-schema/src';
import { CreateTable, PG_TYPES, Insert } from './packages/ornn-sql/src';

const { Model } = ornn();

class Author extends Model {
  static get schema() {
    return {
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
    };
  }
}

const author = new Author({ email: 'autho@mail.com' });

console.log(Author._schema);

// const config = {
//   tableName: 'author',
//   data: {
//     name: 'Johon',
//     age: 23,
//     hobbies: [12, 234],
//     setting: { show: true, tagLine: 'haha', perPage: 123 },
//   },
// };

// console.log(new Insert(config).sql);
// const select = {
//   select: ['email', 'mail', { name: 'id', as: 'authorId', from: 'author' }],
//   where: {
//     connector: 'oR',
//     clauses: [{ email: "= 'hello'" }, { password: "= 'yes'" }],
//   },
// };

// console.log(new Select(select.select).sql);

// const schema = new Schema(
// {
//   email: {
//     type: PG_TYPES.TEXT,
//     required: true,
//     unique: true,
//   },
//   username: {
//     type: PG_TYPES.VARCHAR(200),
//   },
//   age: {
//     type: PG_TYPES.INTEGER,
//   },
//   uuid: {
//     type: PG_TYPES.UUID,
//     default: uuid.v4,
//   },
//   isActive: {
//     type: PG_TYPES.BOOLEAN,
//     default: false,
//   },
// },
//   {
//     tableName: 'author',
//     defaultId: true,
//     timestamp: true,
//   }
// );

// const data = {
//   email: 'author@email.com',
//   username: 'johnevergreeen',
//   unknow: 'cant not see me',
// };

// console.log(schema.getValues(data));
// console.log(schema.describeTable());
// console.log(CreateTable.describe(schema));
