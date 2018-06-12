var config = {};
config.mongoUri = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/lordmvc';
module.exports = config;