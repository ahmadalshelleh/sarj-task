import express from 'express';
import { TickerController } from '../controllers/tickerController';
import { ActivityController } from '../controllers/activityController';

const router = express.Router();
const tickerController = new TickerController();
const activityController = new ActivityController();

/**
 * @swagger
 * /ticker/{ticker}:
 *   get:
 *     summary: Get ticker information and increment access count
 *     tags: [Ticker]
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: The ticker symbol
 *     responses:
 *       200:
 *         description: Ticker information with access count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cik:
 *                   type: number
 *                 name:
 *                   type: string
 *                 ticker:
 *                   type: string
 *                 exchange:
 *                   type: string
 *       404:
 *         description: Ticker not found
 *       500:
 *         description: Internal server error
 */
router.get('/ticker/:ticker', (req, res) => tickerController.getTicker(req, res));

/**
 * @swagger
 * /activity:
 *   get:
 *     summary: Get all ticker access counts
 *     tags: [Activity]
 *     responses:
 *       200:
 *         description: All ticker access counts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: number
 *               example:
 *                 NVDA: 5
 *                 MSFT: 3
 *                 AAPL: 2
 *       500:
 *         description: Internal server error
 */
router.get('/activity', (req, res) => activityController.getActivity(req, res));

export default router;