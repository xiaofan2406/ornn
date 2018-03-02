/* @flow */
import Schema from '@ornn/schema';
import { Insert, helpers } from '@ornn/sql';
import type { Pool } from 'pg';

const { isFunction } = helpers;

export default (pool: Pool) => {
  class Model {
    +_data: Object;
    +_flags: Object = {
      isSaved: false,
    };

    //  user extend Model and should sets schema and options
    static schema: SchemaConfig;
    static options: SchemaOption;

    // user will overwrite these hooks
    static beforeSave: (data: Object) => Promise<void>;
    static afterSave: (data: Object) => Promise<void>;

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
      // validations

      // process timestamp option
      if (this.options.timestamp) {
        data.createdAt = new Date().toISOString();
      }

      const validData = this._schema.getValues(data);
      const query = new Insert({
        tableName: this.options.tableName,
        data: validData,
        returns: helpers.STAR,
      }).sql;
      console.log(query);
      const result = await pool.query(query);
      const created = new this(result.rows[0]);
      return created;
    }

    static async _beforeSave(instance: Object) {
      if (isFunction(this.beforeSave)) {
        this.beforeSave(instance._data);
      }
    }

    // TODO fix instance's type
    static async _afterSave(instance: Object) {
      instance._flags.isSaved = true;
      if (isFunction(this.afterSave)) {
        await this.afterSave(instance._data);
      }
    }

    +save = async () => {
      await this.constructor._beforeSave(this);
      const created = await this.constructor.insert(this._data);
      Object.assign(this._data, created._data);
      await this.constructor._afterSave(this);
      return true;
    };

    get isSaved(): boolean {
      return this._flags.isSaved;
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

    // hooks

    update = () => {};

    delete = () => {};
  }

  return Model;
};
