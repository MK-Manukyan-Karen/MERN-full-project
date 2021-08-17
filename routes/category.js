const express = require('express')
const passport = require('passport')
const router = express.Router()
const upload = require('../meddleware/upload')
const controller = require('../controllers/category')

router.get('/', controller.getAllCategory) 
router.get('/:id',passport.authenticate('jwt', {session: false}),controller.getByIdCategory)
router.delete('/:id',passport.authenticate('jwt', {session: false}),controller.deletByIdCategory)
router.post('/',passport.authenticate('jwt', {session: false}),upload.single('image'),controller.createCategory)
router.patch('/:id',passport.authenticate('jwt', {session: false}),upload.single('image'),controller.updateByIdCategory) 

module.exports = router