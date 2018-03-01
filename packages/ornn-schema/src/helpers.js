/* @flow */

import { PG_TYPES } from '@ornn/sql';

export const DEFAULT_ID_NAME = 'id';

export const DEFAULT_ID_PROPERTY = {
  [DEFAULT_ID_NAME]: {
    type: PG_TYPES.SERIAL,
    primary: true,
  },
};

export const CREATED_AT_PROPERTY = {
  createdAt: {
    type: PG_TYPES.TIMESTAMP,
  },
};
export const UPDATED_AT_PROPERTY = {
  updatedAt: {
    type: PG_TYPES.TIMESTAMP,
  },
};

/**
 * return true if target is null or undefined
 */
export const isNil = (target: any): boolean %checks => target == null;

export const isFunction = (target: any): boolean %checks =>
  typeof target === 'function';
