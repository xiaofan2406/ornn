export const nameEsc = (str: string): string => `"${str}"`;

export const valueEsc = (str: string): string => `'${str}'`;

export const wrapInBrackets = (target: string): string => `(${target})`;
