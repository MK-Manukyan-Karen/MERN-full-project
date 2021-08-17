  const Category = require('../models/Category')
  const Pasition = require('../models/Position')
  const errorHandler = require('../utils/errorHandler')
  
  module.exports.getAllCategory = async (req, res) => {
      try{
       const categories = await Category.find({ user : req.user.id})
       res.status(200).json(categories)
      }catch(e) {
        errorHandler(res,e)
      }
   }

   module.exports.getByIdCategory = async (req, res) => {
      try{
       const category = await Category.findById(req.params.id)
       res.status(200).json(category)
      }catch(e) {
        errorHandler(res,e)
      }
   }

   module.exports.deletByIdCategory = async (req, res) => {
      try{
       await Category.remove({_id : req.params.id})
       await Pasition.remove({ category : req.params.id})
       res.status(200).json({message : 'This Category delete'})
      }catch(e) {
        errorHandler(res,e)
      }
   }

   module.exports.createCategory = async (req, res) => {
      try{
       const category = await new Category({
          name : req.body.name,
          imgSrc : req.file ? req.file.path : '',
          user : req.user.id
       }).save()
       res.status(201).json(category)
      }catch(e) {
        errorHandler(res,e)
      }
   }

   module.exports.updateByIdCategory = async (req, res) => {
      const updated = {
        name : req.body.name,
      }
      if(file.name){
        updated.imgSrc = req.file.path
      }
      try{
       const category = Category.findOneAndUpdate(
          {_id : req.params.id},
          {$set : updated},
          {new : true}
       ).save()
       res.status(200).json(category)
      }catch(e) {
        errorHandler(res,e)
      }
   }
   
