const {dbHelper} = require('../dbHelper/dbHelper');

const getAllProductsService = async (page)=>{
    try {
        let result = await dbHelper.exec('getAllProducts',{page})
        return result
    } catch (error) {
        throw error
    }
}

const getProductByCategoryService = async(params)=>{
    try {
        let result = await dbHelper.exec('getProductByCategory',params)
        return result
    } catch (error) {
        throw error
    }
}

const getProductService = async (param)=>{
    try {
        let result = await dbHelper.exec('getProduct',param)
        return result
    } catch (error) {
        throw error
    }
}

const addProductService = async(param)=>{
    try {
        let result = await dbHelper.exec('addProduct',param)
        return result
    } catch (error) {
        throw error 
    }
}

module.exports = {
    getAllProductsService,
    getProductByCategoryService,
    getProductService,
    addProductService
}