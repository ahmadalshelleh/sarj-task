import { MongoClient, Db } from 'mongodb';
import { config } from './environment';

class Database {
  private client: MongoClient;
  private db: Db | null = null;

  constructor() {
    this.client = new MongoClient(config.mongodb.uri);
  }

  /**
   * Connect to MongoDB.
   *
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db(config.mongodb.dbName);
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  /**
   * Disconnect from MongoDB.
   *
   * @returns {Promise<void>} - A promise that resolves to void.
   */
  async disconnect(): Promise<void> {
    try {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      throw error;
    }
  }

  /**
   * Get the database.
   *
   * @returns {Db} - The database.
   */
  getDb(): Db {
    if (!this.db) {
      throw new Error('Database not initialized. Call connect() first.');
    }
    return this.db;
  }

  /**
   * Check if the database is connected.
   *
   * @returns {boolean} - True if the database is connected, false otherwise.
   */
  isConnected(): boolean {
    return this.db !== null;
  }
}

export const database = new Database();