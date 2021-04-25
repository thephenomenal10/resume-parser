const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    parsedData: {
        type: Object
    },
    jobId:{
        type: String
    }
})

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;



