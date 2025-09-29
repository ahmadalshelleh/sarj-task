import { Db } from 'mongodb';
import { TickerRepository } from '../repositories/tickerRepository';

export class ActivityService {
  private tickerRepository: TickerRepository;

  constructor(db: Db) {
    this.tickerRepository = new TickerRepository(db);
  }

  /**
   * Get all ticker counts.
   *
   * @returns {Promise<{ [key: string]: number }>} 
   */
  async getAllTickerCounts(): Promise<{ [key: string]: number }> {
    try {
      return await this.tickerRepository.getAllTickerCounts();
    } catch (error) {
      console.error('Error in activity service:', error);
      throw error;
    }
  }
}