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
    try {
      const user = req.authUserObj;
      // get user original settings
      const currentSettings = JSON.parse(user.settings);
      const newSettings = currentSettings;
      // check if properties are valid user settings
      const requestData = req.body;
      // assign incoming settings to new settings only if they are acceptable settings.
      // also overwriting currentDbSettings
      Object.entries(requestData).forEach(([key, value]) => {
        if (config.VALID_USER_SETTINGS.indexOf(key) !== -1) {
          newSettings[key] = value;
        }
      });

      // create new settings object, serialize it, and update settings field.
      user.settings = JSON.stringify(newSettings);
      await user.save();
      return res.sendSuccessResponse({ settings: newSettings });
    } catch (errors) {
      return res.sendFailureResponse({ message: 'Error updating user settings.' });
    }
  }
}
