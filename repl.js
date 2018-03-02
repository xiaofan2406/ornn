/* @flow */
import uuid from 'uuid';
import ornn from './packages/ornn-core/src';
import Schema from './packages/ornn-schema/src';
import { CreateTable, PG_TYPES, Insert } from './packages/ornn-sql/src';

const { Model } = ornn({
  user: 'ornn',
  host: '0.0.0.0',
  database: 'ornn_test',
  password: 'ornn',
  port: 5432,
});

class User extends Model {
  static get options() {
    return {
      tableName: 'user',
      defaultId: true,
      timestamp: true,
    };
  }
  static get schema() {
    return {
      email: {
        type: PG_TYPES.TEXT,
        required: true,
        unique: true,
      },
      password: {
        type: PG_TYPES.TEXT,
      },
      activated: {
        type: PG_TYPES.BOOLEAN,
        required: true,
        default: false,
      },
      credit: {
        type: PG_TYPES.INTEGER,
        required: true,
        default: 0,
      },
    };
  }

  static afterSave = async data => {
    console.log('afterSave');
    delete data.password;
  };

  static beforeSave(data) {
    console.log('beforeSave');
    data.password = 'hased password, its secure now';
  }
}
(async () => {
  const user = new User({ email: 'autho@mail.com' });
  user.email = 'author@mail.com';
  user.uknow = '123';

  await user.save();
  user.snapshot();
  process.exit();
})();

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
