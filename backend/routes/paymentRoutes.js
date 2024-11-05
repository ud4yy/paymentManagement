const express = require('express');
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

const router = express.Router();
const paymentController = require('../controllers/paymentController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/',validateToken, paymentController.createPayment);
router.get('/',validateToken, paymentController.getPayments);
router.get('/:id',validateToken, paymentController.getPaymentById);

module.exports = router;


