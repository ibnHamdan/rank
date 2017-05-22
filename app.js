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
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

// import envirnoment variables from .env file
dotenv.config({ path: '.env'});

//connect to Database
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.error('Mongodb connection Error' + `${err.message}`);
});

//import all of models
require('./models/Article');


//Stat app
const app = express();

app.set('port', process.env.PORT || 5555 );
app.listen(app.get('port'), () => {
  console.log(`Express running → PORT 5555`);
});


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
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// After all that above middleware, , handle own routes!
const routes = require('./routes/index');
app.use('/', routes);



module.exports = app;



