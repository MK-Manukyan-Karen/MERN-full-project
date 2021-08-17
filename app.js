const express = require('express')
const app = express()
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/order')
const productRoutes = require('./routes/products')
const keys = require('./config/keys')

 mongoose.connect(keys.mongoURI, { useNewUrlParser: true ,
                                   useUnifiedTopology: true,
                                   useCreateIndex: true,
                                   useFindAndModify: false 
                                 })
   .then(() => console.log('MongoDB successfully connected.'))
   .catch( error => console.log(`You have a problem ))) : ${error}`))

//add new data in db
// const db = mongoose.connection
// db.collections.products.insertMany([])



app.use(passport.initialize())
require('./meddleware/passport')(passport)  
app.use('/uploads',express.static('uploads'))
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use('/labarna/auth', authRoutes)
app.use('/labarna/products', productRoutes)
app.use('/labarna/orders', orderRoutes)


module.exports = app



