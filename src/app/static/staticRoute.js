const static = require("../Static/staticController");
module.exports = function(app){

    //html

    // 01. 메인 페이지
    app.get('/',static.getMain);

    // 02. 로그인 페이지
    app.get('/loginPage',static.loginPage);

    // 03. 찜목록 페이지
    app.get('/wishListPage', static.wishListPage);

    // 04. 회원가입 페이지
    app.get('/signUpPage',static.signUpPage);

    // 05. 선호도 조사 페이지
    app.get('/surveyPage', static.surveyPage);

    // 06. ost 추천 팝업 페이지
    app.get('/pop_up',static.pop_up);

    // 07. 검색 페이지
    app.get('/searchPage',static.searchPage);

    // 08. 전체 검색 페이지
    app.get('/searchAll',static.searchAll);

    app.get('/intro',static.getIntro);
    app.get('/searchicon',static.getSearch);
    app.get('/pointericon',static.getPointer);
    app.get('/menuicon',static.getIcon);
    app.get('/likeicon', static.wishlistPageIn);
    app.get('/dontlikeicon', static.wishListPageOut);
    app.get('/content_ex', static.contentImage);
    app.get('/loginicon',static.getLogin);
    app.get('/logouticon',static.getLogout);
    app.get('/kakaoicon',static.getkakao);
    app.get('/navericon',static.getnaver);
    app.get('/exampleImage',static.getExample);
    app.get('/exampleImage2',static.getExample2);
    app.get('/exampleImage3',static.getExample3);
    app.get('/dodetailicon', static.detailPageIn);
    app.get('/detailicon', static.detailPageOut);
    app.get('/iu',static.getIu);
    app.get('/timothee',static.getTimo);
    app.get('/lee',static.getLee);
    app.get('/goeun',static.getgoEun);
    app.get('/yohanson',static.getYohanson);
    app.get('/tomcruse',static.getTom);
    app.get('/willSmith',static.getSmith);
    app.get('/interest1',static.getInterest1);
    app.get('/interest2',static.getInterest2);
    app.get('/interest3',static.getInterest3);
    app.get('/interest4',static.getInterest4);
    app.get('/interest5',static.getInterest5);
    app.get('/interest6',static.getInterest6);
    app.get('/interest7',static.getInterest7);
    app.get('/interest8',static.getInterest8);
    app.get('/interest9',static.getInterest9);
    app.get('/interest10',static.getInterest10);
    app.get('/interest11',static.getInterest11);
    app.get('/interest12',static.getInterest12);
    app.get('/interest13',static.getInterest13);
    app.get('/interest14',static.getInterest14);

    // 09. 계정 연동 페이지
    app.get('/connectPage',static.connectPage)
};