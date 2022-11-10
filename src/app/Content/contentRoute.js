const jwtMiddleware = require("../../../config/jwtMiddleware");
const content = require("./contentController");
module.exports = function(app){
    const content = require('./contentController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const path = require('path');
    const passport = require('passport');


    //content 라우트 테스트
    app.get('/content-t',content.getTest)

    //필터링 없는 컨텐츠 리스트
    app.get('/all',content.getAll)

    //필터링 컨텐츠 리스트
    app.get('/content-filter',content.getContent)

    //필터링 컨텐츠 리스트
    app.post('/content-name',content.getContentName)

    //관심사 추가
    app.post('/interests',content.postInterest);

    //OST 추천
    app.post('/ost',content.postOst);

    app.post('/liked-list',content.postLikedList);

    app.post('/recommend',content.postRecommend);
};


