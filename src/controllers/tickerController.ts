import { Request, Response } from 'express';
import { TickerService } from '../services/tickerService';
import { database } from '../config/database';

export class TickerController {
  private tickerService: TickerService;

  constructor() {
    this.tickerService = new TickerService(database.getDb());
  }

  /**
   * Get ticker with count.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  async getTicker(req: Request, res: Response): Promise<void> {
    try {
      const { ticker } = req.params;
      
      if (!ticker) {
        res.status(400).json({ error: 'Ticker parameter is required' });
        return;
      }

      const tickerData = await this.tickerService.getTickerWithCount(ticker);
      
      if (!tickerData) {
        res.status(404).json({ error: 'Ticker not found' });
        return;
      }
      
      res.json(tickerData);
    } catch (error) {
      console.error('Error in ticker controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}