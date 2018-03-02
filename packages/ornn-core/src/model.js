/* @flow */

import Schema from '@ornn/schema';
import { Insert } from '@ornn/sql';
import type { Pool } from 'pg';

export default (pool: Pool) => {
  class Model {
    _data: Object;

    /*
      user extend Model and should sets schema and tableName
    */
    static schema: SchemaConfig;
    static options: SchemaOption;

    // get the Schema object through _schema
    // is this needed?
    static __schema: Schema;
    static get _schema(): Schema {
      if (!this.__schema) {
        this.__schema = new Schema(this.schema, this.options);
      }
      return this.__schema;
    }

    constructor(data: Object = {}) {
      this._data = data;

      // proxy this[prop] <===> this._data[prop]
      // only when prop is a recognized by schema
      return new Proxy(this, {
        get(target, prop, reciever) {
          if (target.constructor._schema.properties.includes(prop)) {
            return target._data[prop];
          }
          return Reflect.get(target, prop, reciever);
        },
        set(target, prop, value) {
          if (target.constructor._schema.properties.includes(prop)) {
            target._data[prop] = value;
            return true;
          }
          // cannot set any property thats not known by schema
          return true;
          // return Reflect.set(target, prop, value, reciever);
        },
      });
    }

    static async insert(data: Object) {
      // hooks
      // validations
      const validData = this._schema.getValues(data);
      console.log(validData);
      const query = new Insert({
        tableName: this.options.tableName,
        data: validData,
      }).sql;
      console.log(query);
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

    save = () => this.constructor.insert(this._data);

    // hooks

    update = () => {};

    delete = () => {};
  }

  return Model;
};
