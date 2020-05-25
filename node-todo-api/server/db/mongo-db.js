const mongoose = require('./mongoose-db-connector');
const dbUtils = require('./dbUtils');

const URL = dbUtils.url+"/"+dbUtils.dbName;

var getMongoose = () => {
    return mongoose.getMongoose();
}

var getMongoDbClient = () => {
    return mongoose.connectionFactory(URL, dbUtils.options);
};

module.exports = {
    getMongoDbClient,
    getMongoose
}

