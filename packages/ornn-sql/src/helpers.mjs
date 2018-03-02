/* @flow */

/**
 * return true if target is null or undefined
 */
export const isNil = (target: any): boolean %checks => target == null;

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

export const valueEsc = (value: mixed): string => {
  if (typeof value === 'string') {
    return stringEsc(value);
  }
  if (typeof value === 'number') {
    return numberEsc(value);
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
