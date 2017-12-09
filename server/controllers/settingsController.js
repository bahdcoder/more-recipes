import { updateUserSettings } from './../helpers';
/**
 * Manage user settings
 */
export default class SettingsController {
  /**
   * Update settings for a user
   * @param {obj} req the express request object
   * @param {*} res the express response object
   * @returns {json} json response to user with new settings
   */
  async updateUserSettings(req, res) {
    const newSettings = await updateUserSettings(req.authUserObj, req.body);
    return res.sendSuccessResponse({ settings: newSettings });
  }
}
