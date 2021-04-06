const bodyParser = require('body-parser');

// express import
const express = require('express');

// express app initializing
const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use('/add-product', (req, res, next) => {
    console.log('In add middleware');
    res.send('<form action="/product" method="post"><input type="text" name="title"><button type="submit">Send</button></form>')
})

app.post('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/')
})

app.use('/', (req, res, next) => {
    console.log('In another middleware');
    res.send('<h1>Hello from Express !</h1>')
})

app.listen(8000);