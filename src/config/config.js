const config = require('./config.json');

const env = process.env.NODE_ENV || 'test';

if (env === 'test' || env === 'development') {
  const envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
