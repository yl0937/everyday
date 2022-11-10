const path = require('path');

// html
exports.getMain = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/html/index.html'));
}

exports.loginPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/html/login.html'));
}

exports.wishListPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/html/wishListContent.html'));
}

exports.signUpPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/html/signUp.html'));
}

exports.surveyPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/html/contents_survey.html'));
}

exports.pop_up = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/html/pop_up.html'));
}

exports.searchPage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/html/searchService.html'));
}

exports.searchAll = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/html/searchAll.html'));
}

// Img Source
exports.getkakao = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/kakao_icon.png'));
}

exports.getnaver = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/naver.png'));
}

exports.getHarry = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/harry.png'));
}

exports.getmarble = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/marbel.png'));
}

exports.getIntro = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/intro_bg.png'));
}

exports.getSearch = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/img/search_icon.png'));
}

exports.getPointer = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/img/pointer_icon.png'));
}

exports.getIu = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/img/iu.png'));
}

exports.getTimo = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/img/timothee.png'));
}

exports.getLee = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/img/lee.png'));
}

exports.getgoEun = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/img/goeun.png'));
}

exports.getYohanson = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/img/yohanson.png'));
}

exports.getTom = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/img/tom.png'));
}

exports.getSmith = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/img/smith.png'));
}

// /** API No. 1-1 [GET] 메인 페이지 HTML API **/
exports.getIcon = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/menu_icon.png'));
}

exports.wishlistPageIn = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/dolike1.png'));
}

exports.wishListPageOut = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/dontlike1.png'));
}

exports.detailPageIn = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/dodetail.png'));
}

exports.detailPageOut = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/detail.png'));
}

exports.contentImage = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/like5.png'));
}

exports.getLogin = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/login_icon.png'));
}
exports.getLogout= async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/logout1_icon.png'));
}

exports.getExample = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/exmpleImage.jpg'));
}
exports.getExample2 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/exmpleImage2.jpg'));
}
exports.getExample3 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/exmpleImage3.jpg'));
}

exports.getInterest1 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest1.png'));
}

exports.getInterest2 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest2.png'));
}

exports.getInterest3 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest3.png'));
}

exports.getInterest4 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest4.png'));
}

exports.getInterest5 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest5.png'));
}

exports.getInterest6 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest6.png'));
}

exports.getInterest7 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest7.png'));
}

exports.getInterest8 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest8.png'));
}

exports.getInterest9= async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest9.png'));
}

exports.getInterest10 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest10.png'));
}

exports.getInterest11 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest11.png'));
}

exports.getInterest12 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest12.png'));
}

exports.getInterest13 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest13.png'));
}

exports.getInterest14 = async function (req, res) {
    return res.sendFile(path.join(__dirname,'../../../view/img/interest14.png'));
}

exports.connectPage = async function (req, res) {
    return res.sendFile(path.join(__dirname, '../../../view/html/account_connect.html'));
}