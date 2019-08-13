let express = require('express')
let router = express.Router()


router.get('/person', (req,res) => {
    if(req.query.name){
        res.send(`you have requested ${req.query.name} `)
    }else
    {
        res.send('you have requested a person')
    }
})

router.get('/person/:name', (req,res) =>{
    res.send(`you have requested name: ${req.params.name}`)
})

router.get('/error', (req,res) =>{
    throw new Error('forced')
})
module.exports = router