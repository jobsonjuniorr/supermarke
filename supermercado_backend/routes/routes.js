import express from 'express'
import {getAllProductsHandler,createCategory, createProduct, createRegisterSale,getAllSalesHandle,deleteRegisterSale, getCategory, deletecategory} from '../controlles/productcontroller.js'

const router = express.Router()

router.post('/category',createCategory)
router.post('/createProduct',createProduct)
router.get('/products',getAllProductsHandler)
router.post('/sales',createRegisterSale)
router.get('/sales',getAllSalesHandle)
router.delete('/sales/:id',deleteRegisterSale)
router.delete('/deletecategory/:id',deletecategory)
router.get('/categorylist',getCategory)

export default router