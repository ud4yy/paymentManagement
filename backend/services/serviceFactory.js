const UserService = require('./userService');
const PaymentService = require('./paymentService');

function createService(serviceName) {
    switch (serviceName) {
        case 'user':
            return new UserService();
        case 'payment':
            return new PaymentService();
        default:
            throw new Error(`Unknown service: ${serviceName}`);
    }
}

module.exports = { createService };
