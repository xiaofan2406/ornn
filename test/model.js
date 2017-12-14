import createOrnn, { Schema } from '../src';

const dbConfig = {
  host: 'localhost',
  port: 5432,
  user: 'ornn',
  password: 'ornn',
  database: 'ornn_test',
};

describe('model', () => {
  let ornn;
  let UserModel;

  const clean = () => ornn.pool.query('DELETE FROM public.user');

  beforeAll(() => {
    ornn = createOrnn(dbConfig);

    UserModel = class extends ornn.Model {
      static schema = {
        email: { type: 'email' },
        password: { type: 'string' },
      };

      static tableName = 'user';
    };
  });

  test('it works', () => {
    expect(() => new UserModel()).not.toThrow();
  });

  test('properties list', () => {
    const instance = new UserModel();
    expect(Object.getOwnPropertyNames(instance).sort()).toEqual(
      ['save', 'update', 'delete', '_data'].sort()
    );
  });

  test('static _schema is an instance of Schema', () => {
    expect(UserModel._schema instanceof Schema).toBe(true);
  });

  test('each field in data can be accessed directly', () => {
    const instance = new UserModel({
      email: 'hello@ornn.com',
      password: 'bestorm',
    });

    expect(instance.email).toBe('hello@ornn.com');
    expect(instance.password).toBe('bestorm');
  });

  test('setting field value on the instance should reflect in _data', () => {
    const instance = new UserModel();
    expect(instance.email).not.toBe('hello@ornn.com');

    instance.email = 'hello@ornn.com';
    expect(instance.email).toBe('hello@ornn.com');
    expect(instance._data.email).toBe('hello@ornn.com');
  });

  test('static insert method', async () => {
    await UserModel.insert({ email: 'hello@ornn.com', password: 'bestorm' });
    await clean();
  });

  test('save works', async () => {
    const instance = new UserModel({
      email: 'hello@ornn.com',
      password: 'bestorm',
    });
    await instance.save();
    await clean();
  });
});
