const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const { createController } = require('../controllers/controllerFactory');

const router = express.Router();
const paymentController = createController('payment');

router.post('/', validateToken, paymentController.createPayment);
router.get('/', validateToken, paymentController.getPayments);
router.get('/:id', validateToken, paymentController.getPaymentById);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management
 */

/**
 * @swagger
 * /api/payment:
 *   post:
 *     summary: Create a payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipientName:
 *                 type: string
 *               amount:
 *                 type: number
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/payment:
 *   get:
 *     summary: Get all payments
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: YYYY-MM-DD
 *         required: false
 *         description: Start date for filtering payments
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: YYYY-MM-DD
 *         required: false
 *         description: End date for filtering payments
 *     responses:
 *       200:
 *         description: A list of payments
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/payment/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Payment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */


