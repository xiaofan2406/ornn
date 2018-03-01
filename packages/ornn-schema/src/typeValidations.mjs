export const boolean = {
  name: 'boolean',
  isValid: value => typeof value === 'boolean',
};

export const integer = {
  name: 'integer',
  isValid: value => typeof value === 'number',
};

export const json = {
  name: 'json',
  isValid: value => value.constructor === Object,
};

export const jsonb = {
  name: 'jsonb',
  isValid: value => value.constructor === Object,
};
