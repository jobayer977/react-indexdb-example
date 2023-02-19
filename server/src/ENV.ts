import * as path from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { toBool } from './utils/conversation.util'

config({
  path: path.join(
    process.cwd(),
    'environments',
    `${process.env.NODE_ENV || 'development'}.env`,
  ),
});
export const ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION = 'production';
export const ENV_STAGING = 'staging';
export const ENV = {
  port: +process.env.PORT,
  env: process.env.NODE_ENV || ENV_DEVELOPMENT,
  isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
  isStaging: process.env.NODE_ENV === ENV_STAGING,
  isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

  api: {
    API_PREFIX: process.env.API_PREFIX,
    API_TITLE: process.env.API_TITLE,
    API_DESC: process.env.API_DESC,
    API_VERSION: process.env.API_VERSION,
  },
  db: {
    type: process.env.DB_CONNECTION,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNCHRONIZE,
    logging: process.env.DB_LOGGING,
    rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED,
    autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES,
  },
};

export const ormConfig: TypeOrmModuleOptions = {
  type: ENV.db.type as any,
  host: ENV.db.host,
  port: +ENV.db.port,
  username: ENV.db.username,
  password: ENV.db.password,
  database: ENV.db.database,
  synchronize: toBool(ENV.db.synchronize),
  logging: toBool(ENV.db.logging),
  autoLoadEntities: toBool(ENV.db.autoLoadEntities),
  entities: [path.join(__dirname, '../app/**/*.entity{.ts,.js}')],
};
