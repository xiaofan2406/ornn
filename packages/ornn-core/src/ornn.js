import { Pool } from 'pg';

import makeModel from './model';

export default function createOrnn(dbConfig) {
  const pool = new Pool(dbConfig);

  return {
    pool,
    Model: makeModel(pool),
  };
}
