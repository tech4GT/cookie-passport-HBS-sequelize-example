const express = require('express');
const exphbs = require('express-hbs');
const validator = require('express-validator');
const bp = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const path = require('path');
const cp = require('cookie-parser');

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(cp());


app.engine('hbs', exphbs.express4({
    layoutsDir: path.join(__dirname,'views/layout'),
    defaultLayout: path.join(__dirname,'views/layout/default.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

var routes = require('./routes/index');
var users = require('./routes/users');


app.use('/', express.static(__dirname + '/public_html'));

//express session

app.use(session({
    secret : 'secret',
    saveUninitialized : true,
    resave : true

}));


app.use(passport.initialize());
app.use(passport.session());





//Express Validator


app.use(validator({

    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';

        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

//connect flash

app.use(flash());

//Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


app.use('/',routes);
app.use('/users',users);
app.set('port',(process.env.port || 3000));




app.listen(app.get('port'), function () {
    console.log("we are up and running on 3000");
});