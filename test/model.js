import { Model, Schema } from '../src';

describe('constructor', () => {
  test('it works', () => {
    expect(() => new Model()).not.toThrow();
  });

  test('enumerable properties', () => {
    const instance = new Model();
    expect(Object.keys(instance)).toEqual(['schema', 'save', 'update']);
  });

  test('all properties', () => {
    const instance = new Model();
    expect(Object.getOwnPropertyNames(instance)).toEqual([
      'schema',
      'save',
      'update',
      '$schema',
    ]);
  });

  test('this._schema is an instance of Schema', () => {
    const instance = new Model();
    expect(instance.$schema instanceof Schema).toBe(true);
  });
});
