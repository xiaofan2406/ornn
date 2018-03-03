/* @flow */

/*
=======================================================================
https://www.postgresql.org/docs/10/static/datatype-numeric.html
=======================================================================
*/
export const SMALLINT = 'smallint';
export const INTEGER = 'integer';
export const BIGINT = 'bigint';
export const REAL = 'real';
export const DOUBLE_PRECISION = 'double precision';
export const SMALLSERIAL = 'smallserial';
export const SERIAL = 'serial';
export const BIGSERIAL = 'bigserial';

// TODO throw error if precision and scale are out of range
export const NUMERIC = (precision: number = 8, scale: number = 4): string =>
  `numeric(${precision}, ${scale})`;

/*
=======================================================================
https://www.postgresql.org/docs/10/static/datatype-money.html
=======================================================================
*/
export const MONEY = 'money';

// TODO vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

/*
=======================================================================
https://www.postgresql.org/docs/10/static/datatype-character.html
=======================================================================
*/
export const TEXT = 'text';

export const VARCHAR = (size: number = 255) => `varchar(${size})`;

export const CHAR = (size: number = 120) => `char(${size})`;

export const BOOLEAN = 'boolean';

export const JSON = 'json';

export const JSONB = 'jsonb';

export const TIMESTAMP = 'timestamp with time zone';

export const UUID = 'uuid';
