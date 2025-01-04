import express from 'express'
import {getAllProductsHandler,createProduct} from '../controlles/productcontroller.js'
import { createCategory,getCategory,deletecategory } from '../controlles/caregorycontroller.js'
import { createRegisterSale,getAllSalesHandle,deleteRegisterSale} from '../controlles/saleprodutctcontroller.js'
import {login,regiters} from '../controlles/logincontroller.js'

const router = express.Router()

router.post('/category',createCategory)
router.get('/categorylist',getCategory)
router.delete('/deletecategory/:id',deletecategory)


router.post('/createProduct',createProduct)
router.get('/products',getAllProductsHandler)

router.post('/sales',createRegisterSale)
router.get('/sales',getAllSalesHandle)
router.delete('/sales/:id',deleteRegisterSale)

router.post('/register',regiters)
router.post('/login',login)
export default router