/* @flow */

import * as PG_TYPES from './pg-types';

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
