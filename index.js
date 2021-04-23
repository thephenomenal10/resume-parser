const ResumeParser = require('simple-resume-parser')

//taking resume
const resume = new ResumeParser("./files/Resume.docx");

resume.parseToJSON()
    .then(data => {
        console.log("YAY i have parsed data...", data);
    })
    .catch(error => {
        console.log(error);
    });