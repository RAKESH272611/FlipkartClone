import express from 'express';
import { userSignup,userLogin,userVerify } from '../controller/user-controller.js';
import { getProducts,getProductById } from '../controller/product-controller.js';
import { paymentOrders, paymentVerify } from '../controller/payment-controller.js'
import { addOneItem,removeOneItem,removeAllItem } from '../controller/cart-controller.js';

import { authenticate } from '../middlewares/authenticate.js';
import { authToken } from '../middlewares/authToken.js';

const router = express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);

router.get('/TokenVerify',authToken,userVerify)
router.get('/products',getProducts);
router.get('/product/:id',getProductById);

router.patch('/cart/add/:id',authToken,addOneItem)
router.patch('/cart/remove/:id',authToken,removeOneItem)
router.patch('/cart/remove',authToken,removeAllItem)

router.post('/orders',paymentOrders)
router.post('/veriy',paymentVerify)




export default router;