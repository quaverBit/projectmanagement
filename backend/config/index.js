const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const env = process.env ;

// for async loading configurations from varios sources
module.exports = async () => {
  try {
    env.PORT = env.PORT || 3000;
    env.SALT_STEPS = env.SALT_STEPS ? parseInt(env.SALT_STEPS) : 10;
    console.log(env.MONGO_URI);
    await mongoose.connect(env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });
    return env;
  } catch (ex) {
    console.error('== Error loading configurations ==');
    console.error(ex);
    process.exit(1);
  }
};
