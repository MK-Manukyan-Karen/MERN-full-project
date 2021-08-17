const express = require('express')
const router = express.Router()
const controller = require('../controllers/position')

router.get('/categoryId',controller.getPositionByIdCategory)
router.post('/',controller.createPosition)
router.patch('/:id',controller.updateByIdPosition) 
router.delete('/:id',controller.deleteByIdPosition)



module.exports = router