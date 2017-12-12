import Schema from './schema';

class Model {
  schema = {};

  constructor(data, options) {
    // define non-enumerable properties
    Object.defineProperty(this, '$schema', {
      value: new Schema(this.modelSchema),
    });
  }

  static async find() {}

  static async findOne() {}

  static async delete() {}

  static async update() {}

  save = () => {};

  update = () => {};
}

export default Model;
