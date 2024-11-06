const UserController = require('./userController');
const PaymentController = require('./paymentController');
const { createService } = require('../services/serviceFactory');

function createController(controllerName) {
    switch (controllerName) {
        case 'user':
            const userService = createService('user');
            return new UserController(userService);
        case 'payment':
            const paymentService = createService('payment');
            return new PaymentController(paymentService);
        default:
            throw new Error(`Unknown controller: ${controllerName}`);
    }
}

module.exports = { createController };
