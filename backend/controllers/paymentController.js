const asyncHandler = require("express-async-handler");
const { constants } = require("../constants");

class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;

        this.createPayment = asyncHandler(this.createPayment.bind(this));
        this.getPayments = asyncHandler(this.getPayments.bind(this));
        this.getPaymentById = asyncHandler(this.getPaymentById.bind(this));
    }

    async createPayment(req, res) {
        console.log("Create payment endpoint hit");

        const { recipientName, amount, reason } = req.body;
        const userId = req.user.id;

        if (!recipientName || !amount || !reason) {
            return res.status(constants.VALIDATION_ERROR).json("All fields are mandatory!!");
        }

        const payment = await this.paymentService.createPayment({ recipientName, amount, reason, userId });
        res.status(201).json({ message: "Payment created successfully", payment });
    }

    async getPayments(req, res) {
        const { from, to } = req.query;
        console.log("Get payments endpoint hit");
        const userId = req.user.id;

        if (from && isNaN(new Date(from).getTime())) {
            return res.status(400).json("Invalid 'from' date format");
        }
        if (to && isNaN(new Date(to).getTime())) {
            return res.status(constants.VALIDATION_ERROR).json("Invalid 'to' date format");
        }

        const payments = await this.paymentService.getPayments({ from, to }, userId);
        res.status(200).json({ payments });
    }

    async getPaymentById(req, res) {
        const paymentId = req.params.id;
        console.log(`Get payment by ID endpoint hit for ID: ${paymentId}`);
        const userId = req.user.id;

        if (!paymentId) {
            return res.status(constants.VALIDATION_ERROR).json("Payment ID is required");
        }

        const payment = await this.paymentService.getPaymentById(paymentId, userId);
        if (!payment) {
            return res.status(constants.NOT_FOUND).json("Payment not found or you do not have access to it");
        }

        res.status(200).json({ payment });
    }
}

module.exports = PaymentController;
