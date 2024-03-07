const db = require("../../config/database.js");
const express = require('express');
const app = express();

app.use(express.json());
class ProjectData{
    async  getProjectList(req) {
        try {
            const result = await db.query('CALL usp_getProjectList()', {
                replacements: {},
                type: db.QueryTypes.SELECT,
            });
            // console.log("result", result);
            return result;
        } catch (error) {
            console.error("Error executing getProjectList:", error);
            throw error;
        }
    }
    async updateParameter(req){
        // console.log("reree",req.body)
        const paramterID=req.body.parameterID ||0;
        const projectID = req.body.projectID;
        const moduleParamDet =req.body.moduleParamDet;
        const inverterParamDet=req.body.inverterParamDet;
        const weatherParamDet=req.body.weatherParamDet;
        const stringSizingDet=req.body.stringSizingDet;
        const actionType=req.body.actionType;
        const procedureName = "usp_updateParameterDetails";
        try{
            const result = await db.query(`CALL ${procedureName}(:paramterID, :projectID, :moduleParamDet, :inverterParamDet, :weatherParamDet, :stringSizingDet, :actionType)`, {
                replacements: {
                    paramterID: paramterID,
                    projectID: projectID,
                    moduleParamDet: JSON.stringify(moduleParamDet), // Convert object to JSON string
                    inverterParamDet: JSON.stringify(inverterParamDet), // Convert object to JSON string
                    weatherParamDet: JSON.stringify(weatherParamDet), // Convert object to JSON string
                    stringSizingDet: JSON.stringify(stringSizingDet), // Convert object to JSON string
                    actionType: actionType
                },
                type: db.QueryTypes.RAW,
            });
            
              return result;
        }
        catch (error) {
            console.log(error);
            throw error;
          }
    }

    async updateProject(req){
        const projectID = req.body.projectID ||0;
        const projectName= req.body.projectName;
        const projectCapacity = req.body.projectCapacity;
        const actionType = req.body.actionType;
        const procedureName = "usp_updateProjectDetails";
        try {
          const result = await db.query(`CALL ${procedureName}(:projectID, :projectName, :projectCapacity,:actionType)`, {
            replacements: { projectID, projectName, projectCapacity, actionType},
            type: db.QueryTypes.RAW,
          });
          
          return result;
        } catch (error) {
          console.log(error);
          throw error;
        }
    }
    async deleteProject(req){
        const projectID = req.body.projectID;
        const actionType = req.body.actionType;
        const procedureName = "usp_updateProjectDetails";
        try {
          const result = await db.query(`CALL ${procedureName}(:projectID, :projectName, :projectCapacity,:actionType)`, {
            replacements: { projectID, NULL, NULL, actionType},
            type: db.QueryTypes.RAW,
          });
          return result;
        } catch (error) {
          console.log(error);
          throw error;
        }
    }

    async  getParamterByID(req) {
        try {
            const projectID=req.body.projectID;
            const result = await db.query('CALL usp_getParamterByID(:projectID)', {
                replacements: {projectID},
                type: db.QueryTypes.SELECT,
            });
            // console.log("result", result);
            return result;
        } catch (error) {
            console.error("Error executing getProjectList:", error);
            throw error;
        }
    }

    async getModuleMakeList(req) {
        console.log("in datalayer",req.body);
        try {
           
            const userID=req.body.userID;
            const result = await db.query('CALL usp_getModuleList(:userID)', {
                replacements: { userID },
                type: db.QueryTypes.SELECT,
            });
            console.log("result",result)
            return result;
        } catch (error) {
            throw error;
        }
      }

      async getInverterMakeList(req) {
        try {
            const userID=req.body.userID;
            const result = await db.query('CALL usp_getInverterList(:userID)', {
                replacements: { userID },
                type: db.QueryTypes.SELECT,
            });
            return result;
        } catch (error) {
            throw error;
        }
      }

      async getModelListByModuleID(manufacturerID) {
        try {
            const result = await db.query('CALL usp_getModelListByModuleID(:manufacturerID)', {
                replacements: { manufacturerID },
                type: db.QueryTypes.RAW,
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getModelListByInverterID(manufacturerID) {
        try {
            const result = await db.query('CALL usp_getModelListByInverterID(:manufacturerID)', {
                replacements: { manufacturerID },
                type: db.QueryTypes.RAW,
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getModelDataByModuleID(moduleID) {
        try {
            const result = await db.query('CALL usp_getModelDataByModuleID(:moduleID)', {
                replacements: { moduleID },
                type: db.QueryTypes.RAW,
            });
            console.log(result)
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getModelDataByInverterID(inverterID) {
        try {
            const result = await db.query('CALL usp_getModelDataByInverterID(:inverterID)', {
                replacements: { inverterID },
                type: db.QueryTypes.RAW,
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProjectData;