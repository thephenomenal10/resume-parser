const ResumeParser = require("simple-resume-parser");


exports.resumeParser = async() => {
  const resume = new ResumeParser("./files/testing.docx");
  resume
    .parseToJSON()
    .then(async(data) => {
      console.log("YAY i have parsed data...", data);
      return await data;
    })
    .catch((error) => {
      console.log(error);
    });
    
};

