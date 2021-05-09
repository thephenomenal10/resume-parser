const Resume = require("../models/resumeModel");
const ResumeParser = require("simple-resume-parser");
const fs = require("fs");
const path = "./files/testing.docx";

const multer = require("multer");
const { json } = require("body-parser");
// const ParserController = require("./parserController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files/");
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, "testing" + ext);
  },
});

exports.upload = multer({ storage: storage });

exports.postResume = async (req, res) => {
  try {
    //to parse the data using Simple-resume-parser module
    const resume = new ResumeParser("./files/testing.docx");
    resume.parseToJSON().then(async (data) => {
      //to store the parsed data and job id into the mongo server
      Resume.create({
        parsedData: data,
        jobId: req.body.jobId,
      });

      //to delete the created testing.docx file from the directory
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return "file deleted successfully";
        }
      });

      //to send the response in json
      res.status(201).json({
        message: "data is parsed and stored to mongo server successfully",
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getParsedData = async (req, res) => {
  const data = await Resume.find();
  try {
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
