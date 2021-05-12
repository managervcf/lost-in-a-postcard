import { Secret, SignOptions } from 'jsonwebtoken';

/**
 * Config variables holding all the important and customizable configuration
 * options of the application.
 */
export const config = {
  /**
   * Environment variables keys list required for the initial check.
   */
  envVariablesList: [
    'ADMIN_PASSWORD',
    'DATABASE_URL',
    'JWT_SECRET',
    'S3_ACCESS_KEY_ID',
    'S3_SECRET_ACCESS_KEY',
    'S3_BUCKET_NAME',
    'S3_FOLDER_NAME',
  ],

  /**
   * A function that checks if all the environmet variables
   * with keys defined in the config.envVariablesList are defined.
   */
  checkEnvVariables() {
    let missing: string[] = [];

    this.envVariablesList.forEach(env => {
      if (!(env in process.env)) {
        missing = [...missing, env];
      }
    });

    if (missing.length > 0) {
      throw new Error(
        `Environment variables missing (${
          missing.length
        }): ${missing.toString()}`
      );
    }
  },

  /**
   * Node environment.
   */
  nodeEnv: process.env.NODE_ENV ?? 'development',

  /**
   * Setting deciding if client static files should be served.
   */
  isProduction() {
    return ['production', 'ci'].includes(this.nodeEnv);
  },
  /**
   * Server port.
   */
  port: process.env.PORT ?? '4000',

  /**
   * MongoDB database url.
   */
  databaseUrl: process.env.DATABASE_URL!,

  /**
   * The secret password necessary for a user to sign up.
   */
  adminPassword: process.env.ADMIN_PASSWORD!,

  /**
   * JWT config variables.
   */
  jwt: {
    expiryTime: '3h' as SignOptions['expiresIn'],
    secret: process.env.JWT_SECRET! as Secret,
  },

  /**
   * AWS S3 config variables.
   */
  s3: {
    bucketName: process.env.S3_BUCKET_NAME!,
    folderName: process.env.S3_FOLDER_NAME!,
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },

  /**
   * Email regex needed for the mongoose schema.
   */
  emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  /**
   * Default number of photos sent back by the server.
   */
  requestedPhotosLimit: 5,

  /**
   * Maximum uploaded image size. Value in bytes.
   */
  maxImageSize: 1e7,
};
