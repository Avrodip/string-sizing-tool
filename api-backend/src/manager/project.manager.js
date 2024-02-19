
const ProjectData = require("../dataLayer/project.data");
const projectData= new ProjectData();
class ProjectManager {

    async getProjectList(req, res) {
        try {
            const result = await projectData.getProjectList(req);
            return result;
          } catch (error) {
            let errorLog = error.name + ": " + error.message;
            logger.error(errorLog);
            logManager.generateAPILog(req, "", errorLog, 1);
          }
    }
    async updateProject(req, res) {
        try {
            const result = await projectData.updateProject(req);
            return result;
          } catch (error) {
            let errorLog = error.name + ": " + error.message;
            logger.error(errorLog);
            logManager.generateAPILog(req, "", errorLog, 1);
          }
    }
    async updateParameter(req,res){
        try {
            const result = await projectData.updateParameter(req);
            return result;
          } catch (error) {
            let errorLog = error.name + ": " + error.message;
            logger.error(errorLog);
            logManager.generateAPILog(req, "", errorLog, 1);
          }
    }
    async deleteProject(req, res) {
        try {
            const result = await projectData.deleteProject(req);
            console.log(result[0]);
            return result[0];
        } catch (error) {
          let errorLog = error.name + ": " + error.message;
          logger.error(errorLog);
          logManager.generateAPILog(req, "", errorLog, 1);
        }
    }
}

module.exports = { ProjectManager };
