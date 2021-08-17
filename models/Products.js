const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  
          name : {
              type : String,
          },
          photo : {
             photo1: {type : String},
             photo2: {type : String},
             photo3: {type : String},
          },
          size : {
            type : Number,
          },
          currency : {
            type : String,
          },
          quantity : {
              type : Number
          },
          price : {
              type : Number,
          },
          totalQuantityPrice : {
            type : Number,
        }
 
})

module.exports = mongoose.model('products', productSchema)