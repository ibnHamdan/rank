const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const expressValidator = require('express-validator');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');
//const sequelize = require('sequelize');
const passport = require('passport');

const app = express();

app.set('port', process.env.PORT || 5555 );

// view engine setup
const hbs = exphbs.create({
    defaultLayout: 'default'
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Exposes a bunch of methods for validating data.
app.use(expressValidator());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
    secret: 'rank',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session())

// The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());


//Models
const models = require('./models');

// After all that above middleware, , handle own routes!
const routes = require('./routes/index');
app.use('/', routes);

require('./passport.js')(passport, models.User)

//Sync Database
models.connection.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

app.listen(app.get('port'), () => {
  console.log('Express running → PORT 5555');
});

module.exports = app;



