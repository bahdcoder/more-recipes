/**
 * The parent controller class
 */
export default class Controller {
  /**
   * Return a success response format
   * @param {object} res express response object
   * @param {any} data response data
   * @param {number} status status code
   * @returns {json} response
   */
  static sendSuccessResponse(res, data, status = 200) {
    return res.status(status).json(data);
  }
}
