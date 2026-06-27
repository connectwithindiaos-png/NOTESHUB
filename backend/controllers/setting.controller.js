const settingService = require('../services/setting.service');
const ApiResponse = require('../utils/response');

class SettingController {
  async getAll(req, res, next) {
    try {
      const settings = await settingService.getAll();
      return ApiResponse.success(res, settings);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const settings = await settingService.update(req.body);
      return ApiResponse.success(res, settings, 'Settings updated successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SettingController();
