// express import
const express = require('express');

const bodyParser = require('body-parser');

// express app initializing
const app = express();

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')

app.use(bodyParser.urlencoded({extended: false}))

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(8000);