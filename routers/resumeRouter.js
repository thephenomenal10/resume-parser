const express = require("express");
const { get } = require("../app");
const ResumeController = require("../controllers/resumeController");
const Resume = require("../models/resumeModel");
const router = express.Router();


router
    .route('/postResume')
    .post(ResumeController.upload.single("tmp"), ResumeController.postResume);

router
    .route('/getData')
    .get(ResumeController.getParsedData);


module.exports = router;