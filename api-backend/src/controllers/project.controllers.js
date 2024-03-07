const apiResponse = require("../helpers/apiResponse");
const { ProjectManager } = require("../manager/project.manager")
const projectManager = new ProjectManager();

class ProjectController {

    async getProjectList(req, res) {
        try {
            const result = await projectManager.getProjectList(req, res);

            if (result.length > 0) {
                return apiResponse.successResponseWithData(res, result.message, result);
            } else {
                return apiResponse.conflictRequest(res, result.message);
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }
    async updateProject(req, res) {
        try {
            const result = await projectManager.updateProject(req, res);

            if (result.length > 0) {
                return apiResponse.successResponseWithData(res, result.message, result);
            } else {
                return apiResponse.conflictRequest(res, result.message);
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }
    async updateParameter(req, res) {
        try {
            const result = await projectManager.updateParameter(req, res);

            if (result.length > 0) {
                return apiResponse.successResponseWithData(res, result.message, result);
            } else {
                return apiResponse.conflictRequest(res, result.message);
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }
    async deleteProject(req, res) {
        try {
            const result = await projectManager.deleteProject(req, res);

            if (result.length > 0) {
                return apiResponse.successResponseWithData(res, result.message, result);
            } else {
                return apiResponse.conflictRequest(res, result.message);
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }
    async getParamterByID(req, res) {
        try {
            const result = await projectManager.getParamterByID(req, res);

            if (result.length > 0) {
                return apiResponse.successResponseWithData(res, result.message, result);
            } else {
                return apiResponse.conflictRequest(res, result.message);
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }


    async getModuleMakeList(req, res, next) {
        try {
            const result = await projectManager.getModuleMakeList(req);
            if (result && result.length > 0) {
                // Convert the array of objects to a simple array
                const dataArray = Object.values(result[0]);
                return apiResponse.successResponseWithData(res, "Module data List.", dataArray);
            } else {
                return apiResponse.successResponseWithData(res, "No Module Data available.", []);
            }
        } catch (error) {
            console.log(error);
            return apiResponse.expectationFailedResponse(res, error);
        }
    }
    
    async getInverterMakeList(req, res, next) {
        try {
            const result = await projectManager.getInverterMakeList(req);
            if (result && result.length > 0) {
                // Convert the array of objects to a simple array
                const dataArray = Object.values(result[0]);
                return apiResponse.successResponseWithData(res, "Inverter data List.", dataArray);
            } else {
                return apiResponse.successResponseWithData(res, "No Inverter data available.", []);
            }
        } catch (error) {
            console.log(error);
            return apiResponse.expectationFailedResponse(res, error);
        }
    }
    
    async getModelListByModuleID(req, res, next) {
        try {
          const result = await projectManager.getModelListByModuleID(req);
          if (result && result.length>0) {
            return apiResponse.successResponseWithData(res, "Module Details.", result);
          } else {
            return apiResponse.notFoundResponse(res, "Module details are not found.");
          }
        } catch (error) {
          console.log(error);
          return apiResponse.expectationFailedResponse(res, error);
        }
      }
    
      async getModelListByInverterID(req, res, next) {
        try {
          const result = await projectManager.getModelListByInverterID(req);
          if (result && result.length>0) {
            return apiResponse.successResponseWithData(res, "Inverter Details.", result);
          } else {
            return apiResponse.notFoundResponse(res, "Inverter details are not found.");
          }
        } catch (error) {
          console.log(error);
          return apiResponse.expectationFailedResponse(res, error);
        }
      }
    
      async getModelDataByModuleID(req, res, next) {
        try {
          const result = await projectManager.getModelDataByModuleID(req);
          if (result && result.length>0) {
            return apiResponse.successResponseWithData(res, "Module Details.", result);
          } else {
            return apiResponse.notFoundResponse(res, "Module details are not found.");
          }
        } catch (error) {
          console.log(error);
          return apiResponse.expectationFailedResponse(res, error);
        }
      }
    
      async getModelDataByInverterID(req, res, next) {
        try {
          const result = await projectManager.getModelDataByInverterID(req);
          if (result && result.length>0) {
            return apiResponse.successResponseWithData(res, "Inverter Details.", result);
          } else {
            return apiResponse.notFoundResponse(res, "Inverter details are not found.");
          }
        } catch (error) {
          console.log(error);
          return apiResponse.expectationFailedResponse(res, error);
        }
      }
}

module.exports = { ProjectController };