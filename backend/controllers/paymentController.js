const asyncHandler = require("express-async-handler");
const Payment = require("../models/Payment");
const { constants } = require("../constants");

const createPayment = asyncHandler(async (req, res) => {
    console.log("Create payment endpoint hit");

    const { recipientName, amount, reason } = req.body;
    const userId = req.user.id;

    if (!recipientName || !amount || !reason) {
        res.status(constants.VALIDATION_ERROR).json("All fields are mandatory!!");
    }
    const payment = await Payment.create({
        recipientName,
        amount,
        reason,
        userId
    });
    res.status(201).json({ message: "Payment created successfully", payment });
});

const getPayments = asyncHandler(async (req, res) => {
    const { from, to } = req.query;
    console.log("Get payments endpoint hit");
    const userId = req.user.id;

    if (from && isNaN(new Date(from).getTime())) {
        res.status(400).json("Invalid 'from' date format");
    }
    if (to && isNaN(new Date(to).getTime())) {
        res.status(constants.VALIDATION_ERROR).json("Invalid 'to' date format");
    }

    const query = { userId };
    if (from) query.createdAt = { $gte: new Date(from) };
    if (to) query.createdAt = { ...query.createdAt, $lte: new Date(to) };

    const payments = await Payment.find(query);

    res.status(200).json({ payments });
});

const getPaymentById = asyncHandler(async (req, res) => {
    const paymentId = req.params.id;
    console.log(`Get payment by ID endpoint hit for ID: ${paymentId}`);
    const userId = req.user.id;

    if (!paymentId) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Payment ID is required");
    }

    const payment = await Payment.findOne({ _id: paymentId, userId });
    if (!payment) {
        res.status(constants.NOT_FOUND);
        throw new Error("Payment not found or you do not have access to it");
    }

    res.status(200).json({ payment });
});

module.exports = { createPayment, getPayments, getPaymentById };
