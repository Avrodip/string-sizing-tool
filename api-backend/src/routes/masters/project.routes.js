const express = require("express")

const { ProjectController } = require("../../controllers/project.controllers")

const projectController = new ProjectController();

const router = express.Router();

router.post("/getProjectList", projectController.getProjectList)
router.post("/updateProject",projectController.updateProject)
router.post("/deleteProject",projectController.deleteProject)
router.post("/updateParameter",projectController.updateParameter);
module.exports = router;