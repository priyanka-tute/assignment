const { validateMentor } = require("../services/mentor");
const { searchLoginUserFromMysql } = require("../services/mysql");
const { dashboard } = require("./student");

exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    searchLoginUserFromMysql(email,password).then((data)=>{
        dashboard(req,res,data.email);
    }).catch((err)=>{
        res.send({"success":"false"});
    })
}

exports.loginMentor = (req,res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    validateMentor(email,password).then((data)=>{
        res.send({"success":"true","token":data});
    }).catch((err)=>{
        res.send({"success":"false"});
    })
}