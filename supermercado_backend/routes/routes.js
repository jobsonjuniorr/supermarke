import express from 'express'
import {getAllProductsHandler,createProduct} from '../controlles/productcontroller.js'
import { createCategory,getCategory,deletecategory } from '../controlles/caregorycontroller.js'
import { createRegisterSale,getAllSalesHandle,deleteRegisterSale} from '../controlles/saleprodutctcontroller.js'
const router = express.Router()

router.post('/category',createCategory)
router.get('/categorylist',getCategory)
router.delete('/deletecategory/:id',deletecategory)


router.post('/createProduct',createProduct)
router.get('/products',getAllProductsHandler)

router.post('/sales',createRegisterSale)
router.get('/sales',getAllSalesHandle)
router.delete('/sales/:id',deleteRegisterSale)


export default router