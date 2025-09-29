import { Request, Response } from 'express';
import { ActivityService } from '../services/activityService';
import { database } from '../config/database';

export class ActivityController {
  private activityService: ActivityService;

  constructor() {
    this.activityService = new ActivityService(database.getDb());
  }

  /**
   * Get all ticker counts.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  async getActivity(req: Request, res: Response): Promise<void> {
    try {
      const counts = await this.activityService.getAllTickerCounts();
      res.json(counts);
    } catch (error) {
      console.error('Error in activity controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}