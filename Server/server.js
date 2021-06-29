const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./Db');
const routes = require('./Routes');
const passport = require('./Passport');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.APP_SECRET || "this is the default passphrase",
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initilize());
app.use(passport.session());

if(process.env.NODE_ENV === 'production'){
    const path = require('path');

    app.use(
        '/static',
        express.static(path.join(__dirname, "../client/build/static"))
    );
    app.get('/', (req,res) => {
        res.sendFile(path.join(__dirname, "../client/build"));
    });
}

app.use(routes);

app.use(function (err,req, res,next) {
    console.log("====ERROR====");
    console.error(err.stack);
    res.status(500)
});

app.listen(PORT, () => {
    console.log(` ==> API Server now listening on PORT ${PORT}!`);
});