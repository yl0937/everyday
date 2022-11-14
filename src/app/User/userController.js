const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userController = require("../../app/User/userController");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const passport = require('passport');
const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
const axios = require('axios');
const nodemailer = require('nodemailer');
const smtpTransport = require('../../../config/mail');
const path = require('path');
const regexEmail = require("regex-email");
const fs = require("fs");
const {emit} = require("nodemon");

var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
};
let VarifiedCode;

exports.getTest = async function (req, res) 
{
    console.log("test");
    return res.send(response(baseResponse.SUCCESS))
};

exports.postUsers = async function (req, res) {

    // /**Body: id, name, age, userSex, email, password, number **/
    const {userId, userName, userAge, userSex, userEmail, password, userNum} = req.body;

    const signUpResponse = await userService.createUser(
        userId, userName, userAge, userSex, userEmail, password, userNum
    );

    return res.send(signUpResponse);
};

exports.login = async function (req, res) {
    const {userId, password} = req.body;
    const signInResponse = await userService.postSignIn(userId, password);
    if(signInResponse.code == 1000){
        res.cookie('jwt',userId)
    }
    console.log("성공")
    return res.send(signInResponse);
};

exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS,userIdResult))
};

exports.logout = async function (req, res) {
    res.clearCookie("jwt");
    return res.send(response(baseResponse.SUCCESS))
};

exports.sendMail = async function (req,res)
{
    const number = generateRandom(111111,999999);
    const emailOption = {
        from : "인증이메일",
        to : "elim0937@naver.com",
        subject : "인증이메일",
        text : "이메일 인증 번호 : " + number
    };
    await smtpTransport.sendMail(emailOption,(err,flag) =>
    {
        if(err){
            return res.send(response(baseResponse.DB_ERROR))
        }
        else return number;
    })
    return number;
}