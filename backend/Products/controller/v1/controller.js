const {getAllProductsService, getProductByCategoryService, getProductService, addProductService} = require('../../services/services') 

const getAllProducts = async(req,res)=>{
   try {
        let {page} = req.query
        let result = await getAllProductsService(page || 1)
        if(result.rowsAffected[0]== 0){
            return res.status(404).send({message: 'no products found'})
        }
        res.status(200).send(result.recordsets)
   } catch (error) {
        res.status(500).send({mesage: "internal server error"})
   }
}

const getProductByCategory = async(req,res)=>{
    try {
        let {page} = req.query || 1
        let {category} = req.params
        let result = await getProductByCategoryService({page,category})

        if(result.rowsAffected[0] == 0){
            return res.status(404).send({mesage: "no products under the category"})
        }
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({mesage: 'internal sever error'})
    }
}

const getProduct = async(req,res)=>{
    try {
        let {id} = req.params
        let result = await getProductService({id})
        if(result.rowsAffected[0] == 0){
            return res.status(404).send({mesage: "no such products was found"})
        }
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'internal sever error'})
    }
}

const addProducts = async(req,res)=>{
    try {
        let product = req.body
        let result = await addProductService(product)
        if(result.rowsAffected[0] == 0){
            return res.status(404).send({mesage: "Product was not added"})
        }
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'internal sever error'})
    }
}

module.exports = {
    getAllProducts,
    getProductByCategory,
    getProduct,
    addProducts
}