/* @flow */

import { CreateTable, helpers } from '@ornn/sql';
import {
  DEFAULT_ID_NAME,
  DEFAULT_ID_PROPERTY,
  CREATED_AT_PROPERTY,
  UPDATED_AT_PROPERTY,
} from './helpers';

const { isNil, isFunction } = helpers;

class Schema {
  config: SchemaConfig;
  options: SchemaOption;

  constructor(config: SchemaConfig = {}, options: SchemaOption) {
    this.config = config;
    this.options = options;

    this.processOptions();
  }

  +processOptions = (): void => {
    if (this.options.defaultId) {
      this.config = { ...this.config, ...DEFAULT_ID_PROPERTY };
    }
    if (this.options.timestamp) {
      this.config = {
        ...this.config,
        ...CREATED_AT_PROPERTY,
        ...UPDATED_AT_PROPERTY,
      };
    }
  };

  get properties(): string[] {
    // put id first
    return this.options.defaultId
      ? [
          DEFAULT_ID_NAME,
          ...Object.keys(this.config).filter(
            property => property !== DEFAULT_ID_NAME
          ),
        ]
      : Object.keys(this.config);
  }

  +getDefaultValueFor = (property: string) =>
    isFunction(this.config[property].default)
      ? this.config[property].default()
      : this.config[property].default;

  +getValues = (data: Object): Object => {
    let _data = { ...data };

    return this.properties.reduce((values, property) => {
      if (!isNil(this.config[property].default) && isNil(data[property])) {
        _data = { ...data, [property]: this.getDefaultValueFor(property) };
      }

      // TODO type check
      values[property] = _data[property];

      return values;
    }, {});
  };

  +describeColumn = (name: string, config: PropertyConfig): ColumnConfig => ({
    name,
    type: config.type,
    required: !!config.required,
    default: !isFunction(config.default) ? config.default : undefined,
    primaryKey: !!config.primaryKey,
    unique: !!config.unique,
  });

  +describeTable = (): string => {
    const columns = this.properties.map(property =>
      this.describeColumn(property, this.config[property])
    );
    return new CreateTable({ tableName: this.options.tableName, columns }).sql;
  };

  // TODO
  +validate = (data: Object) => {
    const errors = [];
    for (const property of this.properties) {
      const propertyConfig = this.config[property];
      const value = data[property];
      if (propertyConfig.required === true && isNil(value)) {
        errors.push({
          property,
          message: `${property} is required. Received ${JSON.stringify(value)}`,
        });
        continue;
      }
      // TODO validate type
      if (isFunction(propertyConfig.validate)) {
        const message = propertyConfig.validate(data);
        if (message) {
          errors.push({ property, message });
          continue;
        }
      }
    }
  };
}

export default Schema;
