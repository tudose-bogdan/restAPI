let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

mongoose.model('user', new mongoose.Schema({username:String, id:String}),'user_info');
let user  = mongoose.model('user');

router.get('/person', (req,res) => {
    if(req.query.name){
        console.log("searched for " + req.query.name);
        user.find({username:`${req.query.name}`},(err,data) => {
                try{
                user.find({id: data[0]['id']}, (err, data) => {
                    res.json(data)
                })}
                catch(err)
                {
                    res.status(404).send('Not found');
                }
        })
    }else
    {
        res.send('you have requested a person');
    }
});

router.get('/person/:name', (req,res) =>{
    if(req.params.name) {
        console.log("searched for " + req.params.name);
        user.find({username: `${req.params.name}`}, (err, data) => {

                try{
                user.find({id: data[0]['id']}, (err, date) => {
                    res.json(date)
                })}
                catch(err)
                {
                    res.status(404).send('Not found');

                }
        })
    }
    else
    {
        res.status(404).send('Not found');
        console.log('Not found');
    }

});

module.exports = router;