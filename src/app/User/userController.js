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

// /** API No. 0 [GET]테스트 API **/
exports.getTest = async function (req, res) 
{
    console.log("test");
    return res.send(response(baseResponse.SUCCESS))
};

// 혜연
exports.getkakao = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/kakao_icon.png'));
}

exports.getnaver = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/naver.png'));
}

exports.getIntro = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/intro_bg.png'));
}

exports.getSearch = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/search_icon.png'));
}

exports.getPointer = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/pointer_icon.png'));
}

exports.getPointer = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/pointer_icon.png'));
}

//

// /** API No. 1 [GET] 메인 페이지 HTML API **/
exports.getMain = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/index.html'));
}

// /** API No. 1-1 [GET] 메인 페이지 HTML API **/
exports.getIcon = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/menu_icon.png'));
}

// /** API No. 2 [GET] 로그인 페이지 HTML **/
exports.loginPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/login.html'));
}

// 찜
exports.wishListPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/wishListContent.html'));
}

exports.wishlistPageIn = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/dolike1.png'));
}

exports.wishListPageOut = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/dontlike1.png'));
}

exports.detailPageIn = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/dodetail.png'));
}

exports.detailPageOut = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/detail.png'));
}

exports.contentImage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/like5.png'));
}

exports.getLogin = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/login_icon.png'));
}
exports.getLogout= async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/logout1_icon.png'));
}

// /** API No. 3 [GET] 회원가입 페이지 HTML API **/
exports.signUpPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/signUp.html'));
}

// 설문조사 페이지
exports.surveyPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/contents_survey.html'));
}

// /** API No. 4 [POST]유저 생성 (회원가입) API **/
exports.postUsers = async function (req, res) {

    // /**Body: id, name, age, userSex, email, password, number **/
    const {userId, userName, userAge, userSex, userEmail, password, userNum} = req.body;

    const signUpResponse = await userService.createUser(
        userId, userName, userAge, userSex, userEmail, password, userNum
    );

    return res.send(signUpResponse);
};

// /** API No. 5 [POST]유저 로그인 API **/
exports.login = async function (req, res) {
    const {userId, password} = req.body;
    const signInResponse = await userService.postSignIn(userId, password);
    if(signInResponse.code == 1000){
        res.cookie('jwt',userId)
    }
    console.log("성공")
    return res.send(signInResponse);
};

exports.pop_up = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/pop_up.html'));
}

exports.searchPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/searchService.html'));
}

exports.searchAll = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/searchAll.html'));
}

exports.getExample = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/exmpleImage.jpg'));
}
exports.getExample2 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/exmpleImage2.jpg'));
}
exports.getExample3 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/exmpleImage3.jpg'));
}


/** API No. 6 [GET]소셜 로그인 API **/


/** JWT 토큰 검증 API[GET] /auto-login **/
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS,userIdResult))
};

/** JWT 토큰 검증 API[GET] /auto-login **/
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