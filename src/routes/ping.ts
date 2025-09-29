import { Router } from 'express';
import { PingController } from '../controllers/pingController';

const router = Router();
const pingController = new PingController();

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Successful ping response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 *                 mongodb:
 *                   type: object
 *                   properties:
 *                     connected:
 *                       type: boolean
 *                     status:
 *                       type: string
 */
router.get('/ping', pingController.ping.bind(pingController));

export default router;