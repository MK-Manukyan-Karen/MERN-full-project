const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
 try {
   const candidate = await User.findOne({ email: req.body.email })
     
   if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
      if (passwordResult) {
   
         const token = jwt.sign({
            email: candidate.email,
            userId: candidate._id,
            userName : candidate.userName,
            imgSrc : candidate.imgSrc,
         }, keys.jwt, { expiresIn: '1h' })
      
         res.status(200).json({
            token: `Bearer ${token}`
         })

      } else {
    
         res.status(401).json({
                message: 'Ձեր տվյալները սխալ են'
               })
      }

   } else {
      res.status(404).json({
         message: 'Ձեր տվյալները սխալ են'
      })
   }
}catch (error){
   errorHandler(res, error)
}

}


module.exports.removeLogin = async function (req, res) {
      try {
         
         checkToken(req,res,() => {
         
            res.status(200).json({
                 myData : null,
              })
           })
   
         }catch (error){
           errorHandler(res, error)
         }
  
}

module.exports.register = async function (req, res) {

   const condidate = await User.findOne({
      email: req.body.email
   })

   if (condidate) {
         res.status(409).json({
         message: "Այդպիսի email արդեն առկա է"
      })
   } else {
      const salt = bcrypt.genSaltSync(10)
      const password = req.body.password
      const user = new User({
         userName : req.body.userName,
         email: req.body.email,
         password: bcrypt.hashSync(password, salt),
         imgSrc : req.file ? req.file.path : '',
      })

      try {
         await user.save()
         res.status(201).json({
            user,
            message : 'Շնորհակալություն Դուք հաջողությամբ գրանցվել եք'
         })
      } catch (error) {
        errorHandler(res, error)
      }
   }

}  


const checkToken  =  (req,res,next) => {
     
     let token =  req.headers['x-access-token'] || req.headers['authorization']
   
      if(token === undefined){
         
         return res.status(401).json({
            message : 'Token is not present'
         })
      }
      if (token.startsWith('Bearer ')){
          token = token.slice(7,token.length)
      }
      if(token){
       jwt.verify(token, keys.jwt,async ( err, decoded) => {
         if(err){
            return res.json({
               success : false,
               message : 'Token is  not right..'
            })
         }else {
            let user  = await User.findById({_id : decoded.userId})
            req.decoded = user
            next()
         }
       })
      }else {
         return res.json({
            success : false,
            message : 'Token is  not right..'
         })
      }
}

module.exports.me = async function (req, res) {
  
      try {
         checkToken(req,res,() => {
          res.status(202).json({
               myData : req.decoded,
            })
         })
    
      }catch (error) {
        errorHandler(res, error)
      }
}


 module.exports.updateProfilePhoto = async (req, res) => {
   

try{
   if(req.file){
      let update = {
         imgSrc :req.file.path ,
       }
       let user = await User.findByIdAndUpdate(
          {_id : req.user._id},
          {$set : update},
          {new : true}
          )
        await user.save()
        res.status(200).json(user)
   }

     
    }catch(e) {
      errorHandler(res,e)
    }
  
}


module.exports.updateUserName = async (req, res) => {

let update = {
  userName : req.body.userName
}
try{
  
   let user = await User.findByIdAndUpdate(
      {_id : req.user._id},
      {$set : update},
      {new : true}
      )
    await user.save()
    res.status(200).json(user)
   
    
   }catch(e) {
     errorHandler(res,e)
   }

}







