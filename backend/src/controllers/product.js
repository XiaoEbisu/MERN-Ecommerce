const Product = require('../models/product');
const slugify = require('slugify');
const multer = require('multer');
const shortid = require('shortid');

exports.addProduct = (req, res) => {

    // file: req.file --- if it a single picture
    //res.status(200).json({ file: req.files, body: req.body });

    const {
        name, price, quantity, description
    } = req.body;
    let productPictures = [];
    let categories = [];

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename };
        });
    }
    
    if (req.body.category.length > 0) {
        categories = req.body.category.map(cat => {
            return { categoryId: cat};
        });
    } else {
        return res.status(400).json({message: "Categories required!", error});
    }

    const product = new Product({
        name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        categories,
        createdBy: req.user._id
    });

    product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(201).json({ product });
        }
    });

};