class Schema {
  constructor(schema) {
    this.schema = schema;
  }

  validate(data) {
    const dataKeys = Object.key(data);
    for (const dataKey of dataKeys) {
      // if the property is not defined in the schema
      if (!this.schema[dataKey])
        return new Error(`Unrecognized key ${dataKey}`);

      // more validations
    }
    return true;
  }
}

export default Schema;
