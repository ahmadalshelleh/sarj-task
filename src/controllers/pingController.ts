import { Request, Response } from 'express';
import { database } from '../config/database';

export class PingController {
  /**
   * Health check endpoint.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  async ping(req: Request, res: Response): Promise<void> {
    const mongoStatus = {
      connected: database.isConnected(),
      status: database.isConnected() ? 'connected' : 'disconnected'
    };

    res.json({ 
      message: 'pong',
      mongodb: mongoStatus
    });
  }
}