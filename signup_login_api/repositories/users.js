const { resolve } = require('path');
const pool = require('../config/db.js');
const userQueries = require('../queries/users.js');
const {hashPassword} = require('../utils/passwordHelper.js')

const signUpUser = (first_name,last_name,password,dob,address,place,city,district,state,email,phone)=>{
    const hashedPassword = hashPassword(password);
    return new Promise((resolve,reject)=>{
        pool.query(userQueries.addUser,[first_name,last_name,hashedPassword,dob,address,place,city,district,state,email,phone],
            (error,results)=>{
            if(error){
                reject(error)
            }
            else{
                // console.log(results.rows);
                const userid = results.rows ? results.rows[0].id : undefined;
                resolve(userid);
            }
        })
    })
}

const loginUser = (first_name)=>{
    return new Promise((resolve,reject)=>{
        pool.query(userQueries.getUserByUsername,[first_name],(error,results)=>{
            if(error){
                reject(error);
            }
            else{
                resolve(results.rows);
            }
        })
    })
}

module.exports = {
    signUpUser,
    loginUser
}