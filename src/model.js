import Schema from './schema';

const columnEsc = str => `"${str}"`;
const valueEsc = str => `'${str}'`;

export default pool => {
  class Model {
    static get schema() {
      return {};
    }

    static get tableName() {
      return '';
    }

    static get _schema() {
      if (!this.__schema) {
        this.__schema = new Schema(this.schema);
      }
      return this.__schema;
    }

    constructor(data = {}) {
      this._data = data;

      // proxy this[prop] <===> this._data[prop]
      // only when prop is a recognized by schema
      return new Proxy(this, {
        get(target, prop, reciever) {
          if (target.constructor._schema.keys.includes(prop)) {
            return target._data[prop];
          }
          return Reflect.get(target, prop, reciever);
        },
        set(target, prop, value, reciever) {
          if (target.constructor._schema.keys.includes(prop)) {
            target._data[prop] = value;
            return true;
          }
          return Reflect.set(target, prop, value, reciever);
        },
      });
    }

    static async insert(data) {
      // hooks
      // validations
      const valuesObject = this._schema.getValues(data);

      const values = Object.values(valuesObject)
        .map(valueEsc)
        .join(', ');
      const columns = Object.keys(valuesObject)
        .map(columnEsc)
        .join(', ');

      const { tableName } = this;

      const query = `INSERT INTO "${tableName}" (${columns}) VALUES (${values})`;
      return pool.query(query);
    }

    /**
     * {
     *    fields: {}
     *    count:
     *    orderBy:
     * }
     * @param {*} criteria
     */
    static async select(criteria) {
      // hooks
      // validations
      // criteria
      //
    }

    // static async findOne() {}

    // static async delete() {}

    // static async update() {}

    save = () =>
      // hooks
      this.constructor.insert(this._data);

    update = () => {};

    delete = () => {};
  }

  return Model;
};
