export const nameEsc = str => `"${str}"`;

export const valueEsc = str => `'${str}'`;

export const wrapInBrackets = target => `(${target})`;

export const jsType = target => {
  if (typeof target === 'string') return 'String';
  if (Array.isArray(target)) return 'Array';
  if (target === null) return 'Null';
  if (typeof target === 'undefined') return 'undefined';
  return target.constructor.name;
};

export const getKeyValue = obj => ({
  key: Object.keys(obj)[0],
  value: Object.values(obj)[0],
});
