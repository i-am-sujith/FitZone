const express = require('express')  //importing express

const logic = require('./service/logic')  //importing logic file

const app = express()     //creating server or app

app.use(express.json())  //to convert all incoming json data to javascript

const cors = require('cors') //importing cors

app.use(cors({ origin: 'http://localhost:4200' }))


//request
app.post('/register', (req, res) => {
    logic.register(req.body.username, req.body.name, req.body.password, req.body.age, req.body.gender, req.body.height, req.body.weight).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.post('/login', (req, res) => {
    logic.login(req.body.username, req.body.password).then(result => {
        res.status(result.statusCode).json(result)
    })
})


app.get('/bmi/:currentuser', (req, res) => {
    logic.bmi(req.params.currentuser).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.post('/update', (req, res) => {
    logic.update(req.body.height, req.body.weight, req.body.username).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.post('/underweight', (req, res) => {
    logic.underweight(req.body.currentuser, req.body.bmi, req.body.today).then(result => {
        res.status(result.statusCode).json(result)
    })
})

 
app.get('/underweightTable/:currentuser', (req, res) => {
    logic.underweightTable(req.params.currentuser).then(result => {
        res.status(result.status).json(result)
    })
})

app.listen(3002, () => {                 //setting port for server or app
    console.log('server started at port 3002');
})


