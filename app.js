const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/indexRoutes');
const { EventEmitter } = require('events');
const session = require('express-session');
const mongoConnect = require('./util/database').mongoConnect;
const someEventEmitter = new EventEmitter();
const flash = require('connect-flash');
 
const app = express();
app.set('view engine','ejs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname,'public')));

//middlware to store flash message in session
app.use(session({secret:'my_secret',resave:false,saveUninitialized:true}))
app.use(flash());
// app.use((req,res,next)=>{
//     req.flash = (type,message)=>{
//         req.session.flash = req.session.flash ||{};
//         req.session.flash[type]= message;
//     };
//     next();
// });

// //middleware to display flash message in session
// app.use((req,res,next)=>{
//     res.locals.flash = req.session.flash || {};
//     delete req.session.flash; //clearing the flash message after displaying
//     next();
// });



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




app.use(indexRoutes);


mongoConnect(()=>{

    app.listen(4000,()=>{
        console.log('Listening at 4000 port..');
    });

})


