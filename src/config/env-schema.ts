import { z } from 'zod';

export const envVarsSchema = z.object({
  NODE_ENV: z.string(),
  DEBUG: z.preprocess((stringBool) => Boolean(stringBool === 'true'), z.boolean()),
  PORT: z.preprocess((port) => parseInt(port as string, 10), z.number().positive().max(10000)),
  JWT_SECRET: z.string(),
  ACCESS_KEY: z.string(),
});

export type envVarsSchemaType = z.infer<typeof envVarsSchema>;
