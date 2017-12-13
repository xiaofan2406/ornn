import Schema from './schema';

export default pool => {
  class Model {
    static schema = {};

    static tableName = '';

    $schema = new Schema(this.constructor.schema);

    constructor(data = {}) {
      this.$data = data;

      // proxy this[prop] <===> this.$data[prop]
      // only when prop is a recognized by schema
      return new Proxy(this, {
        get(target, prop, reciever) {
          if (target.$schema.keys().includes(prop)) {
            return target.$data[prop];
          }
          return Reflect.get(target, prop, reciever);
        },
        set(target, prop, value, reciever) {
          if (target.$schema.keys().includes(prop)) {
            target.$data[prop] = value;
            return true;
          }
          return Reflect.set(target, prop, value, reciever);
        },
      });
    }

    // static async find() {}

    // static async findOne() {}

    // static async delete() {}

    // static async update() {}

    save = () => {
      // hooks
      // validations
      const table = this.constructor.tableName;
      const fieldNames = Object.keys(this.$data);
      const fields = fieldNames.map(name => `"${name}"`).join(', ');
      const values = fieldNames.map(name => `'${this.$data[name]}'`).join(', ');
      const query = `INSERT INTO "${table}" (${fields}) VALUES (${values})`;

      return pool.query(query);
    };

    update = () => {};

    delete = () => {};
  }

  return Model;
};
