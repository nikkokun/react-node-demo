// config.js
const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
  app: {
    port: 3000
  }
};

const production = {
  app: {
    port: 3000
  }
};

const config = {
  dev,
  production
};

module.exports = config[env];
