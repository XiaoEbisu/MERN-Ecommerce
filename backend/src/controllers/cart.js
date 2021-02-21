const Cart = require('../models/cart');
const user = require('../models/user');

exports.addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {

            //if CART already exist then UPDATE PRODUCT in cart

            const productAlreadyAdd = req.body.cartItems.product
            const item = cart.cartItems.find(c => c.product == productAlreadyAdd);
            let condition, update;

            if (item) {

                //update QUANTITY
                condition = { "user": req.user._id, "cartItems.product": productAlreadyAdd };
                update = { "$set": {
                    "cartItems.$": {
                        ...req.body.cartItems,
                        quantity: item.quantity + req.body.cartItems.quantity
                    }
                }};

            } else {

                //update NEW PRODUCT
                condition = { "user": req.user._id };
                update = { "$push": {
                    "cartItems": req.body.cartItems
                }};

            };
            
            Cart.findOneAndUpdate( condition, update )
                .exec((error, _cart) => {
                    if (error) return res.status(400).json({ error });
                    if (_cart) {
                        return res.status(201).json({ cart: _cart });
                    }
                });

        } else {

            //if CART not exist then CREATE a new Cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [ req.body.cartItems ]
            });
            
            cart.save((error, cart) => {
                
                if (error) return res.status(400).json({ error });
                if (cart) {
                    return res.status(201).json({ cart });
                }
            });
        }
    });
    
};