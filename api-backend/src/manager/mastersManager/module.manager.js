const ModuleData = require("../../dataLayer/mastersDataLayer/module.data");
const moduleData = new ModuleData();

/**
 * Module Manager.
 */
class ModuleManager {
 /**
     Create Module Manager
   * @param {model} pageMaster.validators
   * @returns {Object}
   */
     async updateModule(req) {
        try {
          const ModuleDetails = await ModuleData.updateModule(req);
          let result;
          if (ModuleDetails && ModuleDetails.length > 0) {
            result = ModuleDetails[0];
          }
          return result;
        } catch (error) {
          throw error;
        }
      }
}


module.exports = ModuleManager;