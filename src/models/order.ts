import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  address: {
    city: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    zipcode: {
        type: String,
        trim: true,
    },
    street: { 
        type: String,
        trim: true,
    },
},
    phone: {
    type: String, 
    required: true,
    trim: true,
    // Add phone number validation based on region if needed
  },
    productIds: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0, 
    },
    userId: { // Add user ID for association
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    }, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;