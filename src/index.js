let express = require('express');
let app = express();
let personRoute = require('./routes/person');
let idRoute = require('./routes/id')
let path = require('path');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/t_data', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected')
});

app.use(bodyParser.json());

app.use((req,res,next) =>{
    console.log(`${new Date().toString()}  => ${req.originalUrl}`);
    next()
});

app.use(personRoute);
app.use(idRoute);
app.use(express.static('public'));

//handler for 404
app.use((req,res,next)=>{
     res.status(404).send('Page not found')
});

//handler for 500
app.use((err,req,res,next) =>{
    console.error(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'))
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.info(`server running on port ${PORT}`));


