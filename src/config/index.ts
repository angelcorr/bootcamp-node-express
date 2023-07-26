import dotEnv = require('dotenv');
import { envVarsSchema, envVarsSchemaType } from './env-schema';

dotEnv.config();

const env = ((): envVarsSchemaType => {
  const validateEnvVarsSchemaResult = envVarsSchema.safeParse(process.env);
  console.log('validateEnvVarsSchemaResult.error', validateEnvVarsSchemaResult);

  if (!validateEnvVarsSchemaResult.success) throw new Error(validateEnvVarsSchemaResult.error.toString());
  return validateEnvVarsSchemaResult.data;
})();

export default env;
