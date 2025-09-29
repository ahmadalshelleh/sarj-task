import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/backend-interview',
    dbName: process.env.MONGODB_DB_NAME || 'backend-interview',
  },
};