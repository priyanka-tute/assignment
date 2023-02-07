const Instructor = require("../models/Instructor");

exports.validateMentor = (email,password) => {
    return new Promise((resolve,reject)=>{
    Instructor.find({email,password}).then((data)=>{
        console.log("ins = ",data);
        if(data.length==0)
        throw "Invalid";
        else
        {
            console.log("sending = ",data[0]["_id"]);
            resolve(data[0]["_id"]);
        }
    }).catch((err)=>{
        reject(err);
    })
})
}