/* @flow */

export const nameEsc = (str: string): string => `"${str}"`;

export const valueEsc = (str: string): string => `'${str}'`;

export const wrapInBrackets = (target: string): string => `(${target})`;

export const indent = (level?: number = 1) => (string: string): string =>
  `${'  '.repeat(level)}${string}`;
