const user = require("../User/userController");
module.exports = function(app){
    const secret = require('../../../config/secret');
    const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
    const userProvider = require("../../app/User/userProvider");
    const userService = require("../../app/User/userService");
    const { response } = require('express');
    const KakaoStrategy = require('passport-kakao').Strategy;

    const user = require('../../app/User/userController'); 
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const path = require('path');
    const passport = require('passport');

    app.get('/intro',user.getIntro); // 배경이미지
    app.get('/searchicon',user.getSearch);
    app.get('/searchPage',user.searchPage);
    app.get('/searchAll',user.searchAll);
    app.get('/pointericon',user.getPointer);

    // 1. 메인 API
    app.get('/',user.getMain);
    app.get('/menuicon',user.getIcon);

    // 찜 목록
    app.get('/likeicon', user.wishlistPageIn);
    app.get('/dontlikeicon', user.wishListPageOut);
    app.get('/wishListPage', user.wishListPage);
    app.get('/content_ex', user.contentImage);

    // 설문조사 페이지
    app.get('/surveyPage', user.surveyPage);

    // 2. 로그인 페이지 HTML
    app.get('/loginicon',user.getLogin);
    app.get('/logouticon',user.getLogout);
    app.get('/loginPage',user.loginPage);
    app.get('/kakaoicon',user.getkakao);
    app.get('/navericon',user.getnaver);
    app.get('/pop_up',user.pop_up);

    app.get('/signUpPage',user.signUpPage);
    app.get('/exampleImage',user.getExample);
    app.get('/exampleImage2',user.getExample2);
    app.get('/exampleImage3',user.getExample3);

    app.get('/dodetailicon', user.detailPageIn);
    app.get('/detailicon', user.detailPageOut);
};