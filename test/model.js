import createOrnn, { Schema } from '../src';

describe('model', () => {
  let UserModel;

  beforeAll(() => {
    const ornn = createOrnn();
    UserModel = class extends ornn.Model {
      static schema = {
        email: { type: 'email' },
        password: { type: 'string' },
      };
    };
  });

  test('it works', () => {
    expect(() => new UserModel()).not.toThrow();
  });

  test('properties list', () => {
    const instance = new UserModel();
    expect(Object.getOwnPropertyNames(instance).sort()).toEqual(
      ['save', 'update', 'delete', '$schema', '$data'].sort()
    );
  });

  test('this.$schema is an instance of Schema', () => {
    const instance = new UserModel();
    expect(instance.$schema instanceof Schema).toBe(true);
  });

  test('each field in data can be accessed directly', () => {
    const instance = new UserModel({
      email: 'hello@ornn.com',
      password: 'bestorm',
    });

    expect(instance.email).toBe('hello@ornn.com');
    expect(instance.password).toBe('bestorm');
  });

  test('setting field value on the instance should reflect in $data', () => {
    const instance = new UserModel();
    expect(instance.email).not.toBe('hello@ornn.com');

    instance.email = 'hello@ornn.com';
    expect(instance.email).toBe('hello@ornn.com');
    expect(instance.$data.email).toBe('hello@ornn.com');
  });
});
