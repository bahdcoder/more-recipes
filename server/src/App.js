import Express from 'express';

/**
 * Application , Express child
 */
export default class Application extends Express {
  /**
   * Sets application port running
   * @param {null} port port num
   */
  constructor(port) {
    super();
    this.port = port;
  }
  /**
   * Bootstraps the application
   * @returns {null} null
   */
  bootstrap() {
    return this.listen(this.port);
  }
}
