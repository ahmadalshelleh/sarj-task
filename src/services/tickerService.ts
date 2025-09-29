import { Db } from 'mongodb';
import { TickerData, TickerResponse } from '../models/ticker';
import { TickerRepository } from '../repositories/tickerRepository';
import { fetchCompanyTickers } from '../caller/secApi';

export class TickerService {
  private tickerRepository: TickerRepository;

  constructor(db: Db) {
    this.tickerRepository = new TickerRepository(db);
  }

  /**
   * Get ticker with count.
   *
   * @param {string} ticker - The ticker symbol.
   * @returns {Promise<TickerData | null>} - A promise that resolves to the ticker data or null if not found.
   */
  async getTickerWithCount(ticker: string): Promise<TickerData | null> {
    try {
      const apiData = await fetchCompanyTickers();
      
      const tickerData = this.findTickerInApiData(apiData, ticker.toUpperCase());
      if (!tickerData) {
        return null;
      }

      await this.tickerRepository.incrementAccessCount(ticker.toUpperCase());

      return tickerData;
    } catch (error) {
      console.error('Error in ticker service:', error);
      throw error;
    }
  }

  /**
   * Find ticker in API data.
   *
   * @param {any} apiData - The API data.
   * @param {string} ticker - The ticker symbol.
   * @returns {TickerData | null} - The ticker data or null if not found.
   */
  private findTickerInApiData(apiData: any, ticker: string): TickerData | null {
    if (!apiData || !apiData.data || !Array.isArray(apiData.data)) {
      return null;
    }

    const tickerIndex = apiData.fields.indexOf('ticker');
    const cikIndex = apiData.fields.indexOf('cik');
    const nameIndex = apiData.fields.indexOf('name');
    const exchangeIndex = apiData.fields.indexOf('exchange');

    if (tickerIndex === -1 || cikIndex === -1 || nameIndex === -1 || exchangeIndex === -1) {
      return null;
    }

    for (const dataRow of apiData.data) {
      if (dataRow[tickerIndex] === ticker) {
        return {
          cik: dataRow[cikIndex],
          name: dataRow[nameIndex],
          ticker: dataRow[tickerIndex],
          exchange: dataRow[exchangeIndex]
        };
      }
    }

    return null;
  }
}