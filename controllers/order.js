const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.getAllOrders = async (req, res) => {

  console.log(req.query)
  const query = {
    user: req.user.id
  }
  
  if(req.query.start){
     query.date = {
       $gte : req.query.start
     }
  }
  if(req.query.end){
    if(!query.date){
      query.date = {}
    }
    query.date['$lte'] = req.query.end
  }
  if(req.query.orderNumber){
     query.orderNumber = +req.query.orderNumber
  }
  try {
   const {page = 1, limit = 5} = req.query
   const allOrders = await Order.find(query)
   const orders = await Order
                        .find(query)
                        .sort({date : -1})
                        .limit(limit * 1)
                        .skip( (page - 1) * limit)
                      

    res.status(200).json({orders, totalOrderCount : allOrders.length})
        
  }catch(error){
     errorHandler(res,error)
  }
}

module.exports.getOrdersByDate = async (req, res) => {

  let startDate = req.query.ordersDate
  let x = req.query.ordersDate.slice(8,10)
  let num = +x + 1
  if(num < 10){
    num = '0' + num
  }else{
     num = '' + num
  }
  let endDate = req.query.ordersDate.slice(0,8)
      endDate = endDate + num


  try {
   const {page = 1, limit = 5} = req.query
   const allOrders = await Order.find({ user: req.user.id,
                                        date:{
                                               $gte : new Date(startDate),
                                               $lt : new Date(endDate)
                                             } 
                                      })
   const orders = await Order
                        .find({
                           user: req.user.id,
                           date:{
                                  $gte : new Date(startDate),
                                  $lt : new Date(endDate)
                                } 
                             })
                        .sort({date :- 1})
                        .limit(limit * 1)
                        .skip( (page - 1) * limit)
  
      if(orders.length){
        res.status(200).json({orders,totalOrderCount : allOrders.length})
      }else {
        res.status(404).json({message : 'Տվյալ ամսաթվով պատվերներ չկան'})
      }

  }catch(error){
     errorHandler(res,error)
  }
}


module.exports.getOrdersByPrice = async (req, res) => {

  try {
   const {page = 1, limit = 5} = req.query
   const allOrders = await Order.find({ 
                                          user: req.user.id,
                                          money:{
                                                 $gte : req.query.start,
                                                 $lte : req.query.end,
                                               } 
                                      })
   const orders = await Order
                        .find({
                           user: req.user.id,
                           money: {
                                  $gte : req.query.start,
                                  $lte : req.query.end,
                                 }
                             })
                        .sort({money :- 1})
                        .limit(limit * 1)
                        .skip( (page - 1) * limit)
  
      if(orders.length){
        res.status(200).json({orders,totalOrderCount : allOrders.length})
      }else {
        res.status(404).json({message : 'Այդպիսի տվյալներով պատվերներ չկան'})
      }

  }catch(error){
     errorHandler(res,error)
  }
}





module.exports.createOrder = async (req, res) => {

  try {
    const lastOrder = await Order
                            .findOne({user : req.user.id})
                            .sort({date: -1})

    const maxOrder = lastOrder ? lastOrder.orderNumber : 0
    const orders = await new Order({
      user: req.user.id,
      order: req.body.newOrders,
      money : req.body.totalPrice,
      orderNumber : maxOrder + 1
    }).save()

    res.status(201).json({
      orders,
      message: 'Շնորհակալություն Ձեր պատվերը ընդունվել է'
    })


  } catch (error) {
    errorHandler(res, error)
  }
}


module.exports.deleteOrders = async (req, res) => {

  try {
    
     await Order.find({
      user: req.user.id,
    }).deleteMany()

    res.status(200).json({
      message : 'DB datark e'
    })

  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.deleteOneOrder = async (req, res) => {
console.log(req.params)
  try {
    
    await Order.find(
      { _id : req.params.id,
         user: req.user.id,
      }).deleteOne()


    res.status(200).json({
      message : 'delete one order'
    })

  } catch (error) {
    errorHandler(res, error)
  }
}
