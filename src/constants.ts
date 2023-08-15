import env from './config';

export default {
  SALTED_ROUNDS: 10,
  DEFAULT_CAPITAL_AMOUNT: 0,
  JWT_SECRET: env.JWT_SECRET || 'super-secret-key',
  API_URL: 'http://data.fixer.io/api',
};
