/* @flow */
export const isVoid = (target: any): boolean %checks => target === undefined;

export const isNull = (target: any): boolean %checks => target === null;

export const isNil = (target: any): boolean %checks =>
  isNull(target) || isVoid(target);

export const isFunction = (target: any): boolean %checks =>
  typeof target === 'function';

export const isObject = (target: any): boolean %checks =>
  target && target.constructor === Object;

export const nameEsc = (str: string) => `"${str}"`;

export const wrapInBrackets = (target: string) => `(${target})`;

export const indent = (level?: number = 1) => (string: string) =>
  `${'  '.repeat(level)}${string}`;

export const stringEsc = (str: string): string => `'${str}'`;

export const numberEsc = (number: number): string => `${number}`;

export const booleanEsc = (bool: boolean): string => String(bool);

export const valueEsc = (value: mixed): string => {
  if (typeof value === 'string') {
    return stringEsc(value);
  }
  if (typeof value === 'number') {
    return numberEsc(value);
  }
  if (typeof value === 'boolean') {
    return booleanEsc(value);
  }
  if (isNull(value)) {
    return 'NULL';
  }
  if (isObject(value)) {
    return stringEsc(JSON.stringify(value));
  }
  return '';
};

export const arrayEsc = (array: mixed[]): string =>
  stringEsc(
    `{${array
      .map(item => (Array.isArray(item) ? '' : valueEsc(item)))
      .join(',')}}`
  );

export const STAR = '*';
