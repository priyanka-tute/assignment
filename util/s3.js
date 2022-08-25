const { uploadFile } = require("../services/s3");

exports.uploadFiles = (files) => {
  return new Promise(async (resolve, reject) => {
    console.log("in util uploadFiles...", files);
    let filelinks = new Array(files.length);
    let filename = new Array(files.length);
    let filecloudlinks = new Array(files.length);

    let count = 0;
    for (let i = 0; i < files.length; i++) {
      await uploadFile(files[i]).then((data) => {
        console.log("File", i, "uploaded ", data);
        filecloudlinks[i] = data.Location, 
        filelinks[i] = data.Key, 
        filename[i] = files[i].originalFilename ;
       // console.log(links[i]);
        count++;
      });
    }
    if (count == files.length) {
      console.log("Files uploaded...");
      resolve({filelinks,filename,filecloudlinks});
    }
  });
};
