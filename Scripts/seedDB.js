const mongoose = require('mongoose');
const db = require('../Server/Models');

console.log('Executing database seed');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/country-cratfs',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
);

const usersSeed = [
    {
        firstName: 'Rich',
        lastName: 'Kessler',
        userName: 'rjkessler',
        email: 'rj@gmail.com',
        password: 'password'
    }
];

