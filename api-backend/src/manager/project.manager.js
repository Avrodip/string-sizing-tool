
const ProjectData = require("../dataLayer/project.data");
const projectData= new ProjectData();
class ProjectManager {

    async getProjectList(req, res) {
        try {
            const result = await projectData.getProjectList(req);
            return result;
          } catch (error) {
            let errorLog = error.name + ": " + error.message;
            // logManager.generateAPILog(req, "", errorLog, 1);
          }
    }
    async updateProject(req, res) {
        try {
            const result = await projectData.updateProject(req);
            return result;
          } catch (error) {
            let errorLog = error.name + ": " + error.message;
            // logManager.generateAPILog(req, "", errorLog, 1);
          }
    }
    async updateParameter(req,res){
        try {
            const result = await projectData.updateParameter(req);
            return result;
          } catch (error) {
            let errorLog = error.name + ": " + error.message;
            // logManager.generateAPILog(req, "", errorLog, 1);
          }
    }
    async deleteProject(req, res) {
        try {
            const result = await projectData.deleteProject(req);
            console.log(result[0]);
            return result[0];
        } catch (error) {
          let errorLog = error.name + ": " + error.message;
        //   logManager.generateAPILog(req, "", errorLog, 1);
        }
    }

    async getParamterByID(req, res) {
        try {
            const result = await projectData.getParamterByID(req);
            return result;
          } catch (error) {
            let errorLog = error.name + ": " + error.message;
            // logManager.generateAPILog(req, "", errorLog, 1);
          }
    }

    async getModuleMakeList(req) {
        try {
          const result = await projectData.getModuleMakeList(req.user.userID);
          return result;
        } catch (error) {
            let errorLog = error.name + ': ' + error.message
            // logManager.generateAPILog(req, '', errorLog, 1)
        }
      }
    
      async getInverterMakeList(req) {
        try {
          const result = await projectData.getInverterMakeList(req.user.userID);
          return result;
        } catch (error) {
            let errorLog = error.name + ': ' + error.message
            // logManager.generateAPILog(req, '', errorLog, 1)
        }
      }
    
    
    
      async getModelListByModuleID (req) {
        try {
          const manufacturerID = req.body.manufacturerID
          const result = await projectData.getModelListByModuleID(manufacturerID)
    
          return result
        } catch (error) {
          let errorLog = error.name + ': ' + error.message
        //   logManager.generateAPILog(req, '', errorLog, 1)
        }
      }
    
      async getModelListByInverterID (req) {
        try {
          const manufacturerID = req.body.manufacturerID
          const result = await projectData.getModelListByInverterID(manufacturerID)
    
          return result
        } catch (error) {
          let errorLog = error.name + ': ' + error.message
        //   logManager.generateAPILog(req, '', errorLog, 1)
        }
      }
    
      async getModelDataByModuleID (req) {
        try {
          const moduleID = req.body.moduleID
          const result = await projectData.getModelDataByModuleID(moduleID)
    
          return result
        } catch (error) {
          let errorLog = error.name + ': ' + error.message
        //   logManager.generateAPILog(req, '', errorLog, 1)
        }
      }
    
      async getModelDataByInverterID (req) {
        try {
          const inverterID = req.body.inverterID
          const result = await projectData.getModelDataByInverterID(inverterID)
    
          return result
        } catch (error) {
          let errorLog = error.name + ': ' + error.message
        //   logManager.generateAPILog(req, '', errorLog, 1)
        }
      }
}

module.exports = { ProjectManager };
