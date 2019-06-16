const config = require('./config');

(async () => {
  await config();
  require('./src/app');
})();