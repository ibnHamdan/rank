const express = require('express');
const path = require('path');
// const logger = require('morgan');
// const compression = require('compression');
const expressValidator = require('express-validator');
// const methodOverride = require('method-override');
const cookieParser= require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
const passport = require('passport');
const db = require('./config/db');
const SessionStore = require('connect-session-sequelize')(session.Store);

const app = express();

app.set('port', 5555);

// view engine setup
const hbs = exphbs.create({
    defaultLayout: 'default',
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// serves up static files from the public folder.
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json()); ``;
app.use(bodyParser.urlencoded({extended: true}));

// Exposes a bunch of methods for validating data.
app.use(expressValidator());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(cookieParser('rank'));
app.use(session({
    secret: 'rank',
    username: 'usernam',
    saveUninitialized: true,
    resave: false,
    store: new SessionStore({
        db: db.sequelize,
    }),
}));
app.use(passport.initialize());
app.use(passport.session());

// The flash middleware let's us use req.flash
app.use(flash());


// Models
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// After all that above middleware, , handle own routes!
const routes = require('./routes/index');
app.use('/', routes);

require('./config/passport.js')(passport, db.users);

db.sequelize.sync().then(() => {
    app.listen(app.get('port'), ()=> {
        console.log(`Express listening on port: ${app.get('port')}`);
    });
});

// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running → PORT ${server.address().port}`);
// });


module.exports = app;


