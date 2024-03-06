const express = require("express")

const { ProjectController } = require("../../controllers/project.controllers")

const projectController = new ProjectController();

const router = express.Router();
router.post("/getModuleMakeList", projectController.getModuleMakeList);
router.post("/getInverterMakeList", projectController.getInverterMakeList);
router.post("/getModelListByModuleID",projectController.getModelListByModuleID);
router.post("/getModelListByInverterID",  projectController.getModelListByInverterID);

router.post("/getModelDataByModuleID",  projectController.getModelDataByModuleID);
router.post("/getModelDataByInverterID",  projectController.getModelDataByInverterID);



router.post("/getProjectList", projectController.getProjectList)
router.post("/updateProject",projectController.updateProject)
router.post("/deleteProject",projectController.deleteProject)
router.post("/updateParameter",projectController.updateParameter);
router.post("/getParamterByID",projectController.getParamterByID);
module.exports = router;