const Product = require('../models/products')

exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product', 
        activeAddProduct: true,
        formsCSS: true,
        productCSS: true,
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        });
    });
}

exports.postAddProducts = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/')
}