let express = require('express')
let app = express()
let personRoute = require('./routes/person')
let accRoute = require('./routes/account')
let path = require('path')
let bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req,res,next) =>{
    console.log(`${new Date().toString()}  => ${req.originalUrl}`)

    next()
})
app.use(personRoute)
app.use(accRoute)
app.use(express.static('public'))


//handler for 404
app.use((req,res,next)=>{
     res.status(404).send('Page not found')
})

//handler for 500
app.use((err,req,res,next) =>{
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.info(`server running on port ${PORT}`))



