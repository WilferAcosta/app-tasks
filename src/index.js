const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


// inicielizations
const app = express();

//settings
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//global variables
app.use((req,res,next)=>{

    next();
})


//routes
app.use(require('./router'));
app.use(require('./router/authentication'));
app.use('/links',require('./router/links'));

//public
app.use(express.static(path.join(__dirname,'public')));
//starting the server
app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
})