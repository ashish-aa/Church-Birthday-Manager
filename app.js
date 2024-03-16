const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const indexRoutes = require('./routes/indexRoutes');
const mongoConnect = require('./util/database').mongoConnect;
 
const app = express();
app.set('view engine','ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(indexRoutes);


mongoConnect(()=>{

    app.listen(4000,()=>{
        console.log('Listening at 4000 port..');
    });

})


