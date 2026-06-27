const settingRepository = require('../repositories/setting.repository');

class SettingService {
  async getAll() {
    return settingRepository.findAll();
  }

  async update(data) {
    const entries = Object.entries(data).map(([key, value]) => ({ key, value: String(value) }));
    return settingRepository.bulkUpsert(entries);
  }
}

module.exports = new SettingService();
