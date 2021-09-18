const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const CartSchema = new Schema(
    {
        product: {
            type: ObjectId,
            ref: 'Product'
        },
        name: String,
        count: Number,
        price: Number
    }
);

const orderSchema = Schema(
    {
        products: [ CartSchema ],
        transatction_id: {},
        amount: {
            type: Number
        },
        address: {
            type: String,
            trim: true,
            required: true
        },
        update: Date,
        user: {
            type: ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true}
);

const Cart = mongoose.model('Cart', CartSchema);
const Order = mongoose.model('Order', orderSchema);
module.exports = { Cart, Order };