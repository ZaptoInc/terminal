var allConfigs = require('./config.json')

// prod/dev arg
var env = process.env.NODE_ENV || 'dev';

// adds the envconfig to the 'common' config
var config = { 
    ...allConfigs.common,
    ...allConfigs[env]
}

exports.config = config
exports.env = env