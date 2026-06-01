const express      = require('express');
const router       = express.Router();
const rateLimiter  = require('../middleware/rateLimiter');
const { handleChat } = require('../controllers/chatController');

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Send a message to the Zoe chatbot
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: The user's message to the chatbot
 *                 example: "What are your clinic hours?"
 *     responses:
 *       200:
 *         description: Chatbot reply
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                   description: The chatbot's response
 *                   example: "Our clinic hours are: Mon–Fri: 8:00 AM – 7:00 PM, Saturday: 9:00 AM – 4:00 PM, Sunday: Closed"
 *       400:
 *         description: Invalid or empty message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                   example: "Please send a valid message."
 *       429:
 *         description: Rate limit exceeded (30 messages per minute)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                   example: "Too many messages sent. Please wait a moment before trying again."
 */
router.post('/', rateLimiter, handleChat);

module.exports = router;
