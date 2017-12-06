import config from './../config';
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
    const user = req.authUserObj;

    const currentSettings = JSON.parse(user.settings);
    const newSettings = currentSettings;

    const requestData = req.body;

    Object.entries(requestData).forEach(([key, value]) => {
      if (config.VALID_USER_SETTINGS.indexOf(key) !== -1) {
        newSettings[key] = value;
      }
    });

    user.settings = JSON.stringify(newSettings);
    await user.save();
    return res.sendSuccessResponse({ settings: newSettings });
  }
}
