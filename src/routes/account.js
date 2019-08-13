let accModel = require('../models/acc.model')
let express = require('express')
let router = express.Router()

router.post('/account', (req,res) =>{
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }
    let user =
        {
            name:"bogdan",
            emai:'bogdan.bogdan.com'
        }
    let model = new accModel(req.body)
    model.save()
        .then(doc=>{
            if(!doc || doc.length === 0)
            {return res.status(500).send(doc)}

            res.status(201).send(doc)

        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router