const Payment = require("../models/Payment");

class PaymentService {
    async createPayment(data) {
        const { recipientName, amount, reason, userId } = data;
        return await Payment.create({
            recipientName,
            amount,
            reason,
            userId,
        });
    }

    async getPayments(query, userId) {
        const { from, to } = query;
        const filter = { userId };
        
        if (from) filter.createdAt = { $gte: new Date(from) };
        if (to) filter.createdAt = { ...filter.createdAt, $lte: new Date(to) };

        return await Payment.find(filter);
    }

    async getPaymentById(paymentId, userId) {
        return await Payment.findOne({ _id: paymentId, userId });
    }
}

module.exports = PaymentService;
