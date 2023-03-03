const {Router} = require('express')
const router = Router()
const { getAllProducts,getProductByCategory,getProduct,addProducts } = require('../../controller/v1/controller')
const {sellerVerification} = require('../../middleware/middleware')

router.get('/v1/',getAllProducts)
router.get('/v1/catgory/:category',getProductByCategory)
router.get('/v1/:product',getProduct)
router.post('/v1/products',sellerVerification,addProducts)


module.exports = {router}