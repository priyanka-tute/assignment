// require("./mongoose");
//comment above
const mysql = require('mysql2');
// const Course = require('../models/course');
// const Student = require("../models/student");

// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_USER_PASSWORD,
//   database: process.env.DB_NAME_MYSQL
// });


const user_connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME_USER
  });

// getOrAddStudentFromMysql = (email) => {
//     // connection.connect();
//     connection.query('SELECT * from user WHERE email = \''+email+"\';", async (err, rows, fields) => {
//     if (err) throw err

//     console.log('The solution is: ', rows);
//     // let student = {}
//     // student.email = rows[0].email;
//     // student.student_id_backup=rows[0].student_id;
//     // student.studentName = rows[0].name;


//     const studentExists = await Student.findOne({email:rows[0].email});

//     if(studentExists!="" && studentExists!=undefined && studentExists.length>0)
//     {
//         console.log("student exists...");
//         return studentExists;
//     }
//     else
//     {
//             const student = new Student({email:rows[0].email,
//             password:rows[0].password,
//             studentName:rows[0].first_name+" "+rows[0].last_name,
//             student_id_backup:rows[0].student_id});
//             await student.save();
//             connection.query('SELECT course_id from course_user WHERE student_id = '+rows[0].student_id+";",async (err, courses, fields) => {
//                 if (err) throw err
                
//                 console.log('The solution is: ', courses);
//                 let courseList = [];
//                 for(let i = 0;i<courses.length;i++)
//                 {
//                     const courseExists = await Course.findOne({course_id_backup:courses[i].course_id});
//                     console.log("courseExists = ",courseExists);
//                     if(courseExists!="" && courseExists!=undefined && courseExists.length>0)
//                     {
//                         // return courseExists;
//                         courseList.push(courseExists);
//                     }
//                     else {
//                     connection.query('SELECT course_name FROM course WHERE course_id = '+courses[i].course_id+";",async (err,course,fields)=>{

//                         if (err) throw err;
//                         console.log("SELECT course = ",course);
//                         const course1 = await new Course({courseName:course[0].course_name,course_id_backup:courses[i].course_id});
//                         console.log("course1 = ",course1);
//                         await course1.save();
//                         console.log("Pushing to courseList ",course1,courseList);
//                         courseList.push(course1["_id"]);
//                     })
//                 }
//                 }
//                 console.log("courseList = ",courseList);
//                 student.courses = courseList;
//                 await student.save();
//                 console.log("Returning student = ",student);
//                 return student;
//             });

//         }
//         // connection.end();
//     });
// }

// // console.log(getOrAddStudentFromMysql('a@b.com'));


// exports.getStudentFromMysql = (email) => {
//     return new Promise((resolve,reject)=>{
//     console.log("mysql email = ",email);
//     // connection.connect();
//     connection.query('SELECT * from paymentinfo WHERE email = \''+email+"\';",async (err, rows, fields) => {
//     if (err){
//         console.log(err);
//         reject(err);
//     }
//     else
//     {
//         console.log("rows = ",rows);
//         let student = {};
//         student.studentName = rows[0].name;
//         student.email = rows[0].email;
//         // student.student_id_backup = student_id;
//         student.courses = rows[0].sub_category.split(",");
//         student.coupon_code_used = rows[0].coupon_code;
//         const date = new Date(rows[0].date_time);
//         student.date_time = date.getDate() + "-" +date.getMonth()+"-"+date.getFullYear() ;
// // await getCourses(student_id);
//         console.log(student);
//         resolve(student);
//         // let courseList=[];
//         // for(let i =0;i<student.courses.length;i++)
//         // {
//         //     Course.findOneAndUpdate({course_id_backup:student.courses[i].course_id},{name:student.courses[i].course_name},{'new': false,upsert:true});
//         // }
//         // bulk = Course.bulkWrite();
//         // for (let i =0;i<student.courses.length;i++) {
//         //     bulk.find({course_id_backup:student.courses[i].course_id}).upsert().update({name:student.courses[i].course_name});
//         // }
//         // bulk.execute((err, course)=>{
//         //     console.log("course = ",course);
//         //     // courseList.push(course["_id"]);
//         // });
//         // student.courses = courseList;
//         // const s = await Student.findOneAndUpdate({student_id_backup:student_id},student,{upsert:true});
//         // console.log("s = ",s);
//         // return s;
//     }
// });
// });
// }


// exports.getStudentReferralsFromMysqlCoupon = (code) => {
//     return new Promise((resolve,reject)=>{
//         console.log("mysql coupon_code = ",code);
//         // connection.connect();
//         connection.query('SELECT * from paymentinfo WHERE coupon_code = \''+code+"\';",async (err, rows, fields) => {
//         if (err){
//             console.log(err);
//             reject(err);
//         }
//         else
//         {
//             let students = [];
//             for(let i=0;i<rows.length;i++)
//             {
//                 console.log("rows = ",rows);
//                 let student = {};
//                 student.studentName = rows[i].name;
//                 student.email = rows[i].email;
//                 // student.student_id_backup = student_id;
//                 student.courses = rows[i].sub_category.split(",");
//                 student.coupon_code_used = rows[i].coupon_code;
//                 const date = new Date(rows[i].date_time);
//                 student.date_time = date.getDate() + "-" +date.getMonth()+"-"+date.getFullYear() ;
//                 student.referralAmount = "200";
//                 // await getCourses(student_id);
//                 console.log(student);
//                 students.push(student);
//             }
//             resolve(students);
//         }
//     });
// });
// }

// exports.applyCouponFromMysql = (coupon) =>{
//     return new Promise((resolve,reject)=>{
//         console.log("mysql coupon = ",coupon);
//         // connection.connect();
//         connection.query('UPDATE wallet_balance SET wallet_balance=wallet_balance + (Select amount_to_referrer from coupon WHERE coupon_code = \'' +coupon+ '\' ) from refer WHERE coupon_code_id = (Select id WHERE coupon_code = \''+coupon+"\');",async (err, rows, fields) => {
//         if (err){
//             console.log(err);
//             reject(err);
//         }
//         else
//         {
//             connection.query('SELECT * FROM coupon WHERE coupon_code = \''+coupon+'\';',(err,rows,fields)=>{

//             })
//         }
//     });
// });
// }

// exports.getReferralDataFromMysql = (email) =>{
//     return new Promise((resolve,reject)=>{
//         console.log("mysql email = ",email);
//         // connection.connect();
//         connection.query('SELECT r.walletBalance, r.referralEarnings, c.coupon_code FROM refer r INNER JOIN coupon c ON c.id=r.coupon_code_id WHERE r.student_email = \''+email+"\';",async (err, rows, fields) => {
//         if (err){
//             console.log(err);
//             reject(err);
//         }
//         else
//         {
//             resolve(rows);
//         }
//     });
// });
// }


// exports.searchLoginUserFromMysql = (email,password) => {
//     return new Promise((resolve,reject)=>{
//         console.log("mysql email = ",email, " password = ",password);
//         // connection.connect();
//         user_connection.query('SELECT * FROM user where email = \''+email+"\' and password = \'"+password+"\';",async (err, rows, fields) => {
//         if (err){
//             console.log(err);
//             reject(err);
//         }
//         else
//         {
//             if(rows.length>0)
//             {
//                 resolve({email:rows[0].email});
//             }
//             else
//             {
//                 reject("Invalid");
//             }
//         }
//     });
// });
// }

exports.searchUserFromMysql = (email) => {
    return new Promise((resolve,reject)=>{
        console.log("mysql email = ",email);
        // connection.connect();
        user_connection.query('SELECT * FROM user where email = \''+email+"';",async (err, rows, fields) => {
        if (err){
            console.log(err);
            reject(err);
        }
        else
        {
            if(rows.length>0)
            {
                resolve({email:rows[0].email,name:rows[0].name});
            }
            else
            {
                reject("Invalid");
            }
        }
    });
});
}
