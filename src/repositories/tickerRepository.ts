import { Collection, Db } from 'mongodb';
import { TickerAccessCount } from '../models/ticker';

export interface ITickerRepository {
  incrementAccessCount(ticker: string): Promise<number>;
  getAccessCount(ticker: string): Promise<number>;
  getAllTickerCounts(): Promise<{ [key: string]: number }>;
}

export class TickerRepository implements ITickerRepository {
  private accessCollection: Collection<TickerAccessCount>;

  constructor(db: Db) {
    this.accessCollection = db.collection<TickerAccessCount>('tickerAccess');
  }

  /**
   * Increment access count.
   *
   * @param {string} ticker - The ticker symbol.
   * @returns {Promise<number>} - A promise that resolves to the access count.
   */
  async incrementAccessCount(ticker: string): Promise<number> {
    try {
      const result = await this.accessCollection.findOneAndUpdate(
        { ticker: ticker.toUpperCase() },
        {
          $inc: { count: 1 },
          $set: { lastAccessed: new Date() }
        },
        {
          upsert: true,
          returnDocument: 'after'
        }
      );

      return result?.count || 1;
    } catch (error) {
      console.error('Error incrementing access count:', error);
      throw error;
    }
  }

  /**
   * Get access count.
   *
   * @param {string} ticker - The ticker symbol.
   * @returns {Promise<number>} - A promise that resolves to the access count.
   */
  async getAccessCount(ticker: string): Promise<number> {
    try {
      const result = await this.accessCollection.findOne({ ticker: ticker.toUpperCase() });
      return result?.count || 0;
    } catch (error) {
      console.error('Error getting access count:', error);
      throw error;
    }
  }

  /**
   * Get all ticker counts.
   *
   * @returns {Promise<{ [key: string]: number }>} - A promise that resolves to an object with the ticker counts.
   */
  async getAllTickerCounts(): Promise<{ [key: string]: number }> {
    try {
      const results = await this.accessCollection.find({}).toArray();
      const counts: { [key: string]: number } = {};
      
      results.forEach(result => {
        counts[result.ticker] = result.count;
      });
      
      return counts;
    } catch (error) {
      console.error('Error getting all ticker counts:', error);
      throw error;
    }
  }
}