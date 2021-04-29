const express = require('express');

const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProducts);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product', isAuth, adminController.postAddProducts);

router.get(
  '/edit-product/:productId',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('title').isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.getEditProducts
);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post(
  '/delete-product',
  [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('title').isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  adminController.postDeleteProduct
);

module.exports = router;
