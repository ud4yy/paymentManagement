const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    recipientName: {
        type: String,
        required: true,
        trim: true 
    },
    amount: {
        type: Number,
        required: true,
        min: 0 
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
