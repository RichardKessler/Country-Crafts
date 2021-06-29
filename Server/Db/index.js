const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const MONGO_LOCAL_URL = 'mongodb://localhost/country-crafts';

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
} else {
    mongoose.connect(MONGO_LOCAL_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });  // local mongo url
}

const db = mongoose.connection;
db.on('error', (err) => {
    console.log(`There was an error connecting to the database: ${err}`);
});

db.once('open', () => {
    console.log('You have successfully connected to your mongo database');
});

module.exports = db;