const jwtMiddleware = require("../../../config/jwtMiddleware");
const contentProvider = require("../../app/Content/contentProvider");
const userProvider = require("../../app/User/userProvider");
const contentService = require("../../app/Content/contentService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const axios = require('axios');
const path = require('path');
const fs = require("fs");
const {emit} = require("nodemon");

// /** API No. 0 [GET]테스트 API **/
exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
};

// /** API No. 1 [GET]컨텐츠 리스트 API **/
exports.getAll = async function (req, res) {
    const getAllRes = await contentProvider.retrieveAllContent();
    return res.send(response(baseResponse.SUCCESS,getAllRes))
};

// /** API No. 2 [GET]컨텐츠 리스트 API **/
exports.getContent = async function (req, res) {
    const {tag} = req.body;
    const tagId = await contentProvider.retrieveTag(tag);
    const getContentRes = await contentProvider.retrieveContentByTag(tagId);
    return res.send(response(baseResponse.SUCCESS,getContentRes))
};

// /** API No. 2 [POST]유저 관심사 추가API **/
exports.postInterest = async function (req, res) {
    const userIdResult = req.body.userId;
    const userIdres = await userProvider.retrieveUserId(userIdResult);
    const userId = userIdres['id']
    const list = req.body.conlist;
    for(var i=0;i<list.length;i++)
    {
        const result = await contentService.userInterest(list[i],userId);
    }
    return res.send(response(baseResponse.SUCCESS));
};

// /** API No. 2 [GET]컨텐츠 리스트 API **/
exports.getContentName = async function (req, res) {
    const name = req.body.name;
    setname = "%" + name +"%"
    const getContentRes = await contentProvider.retrieveContentByName(setname);
    return res.send(response(baseResponse.SUCCESS,getContentRes))
};

// /** API No. 2 [GET]컨텐츠 리스트 API **/
exports.postOst = async function (req, res) {
    const userId = req.body.userId;
    const content = await contentProvider.retrieveUserContentId(userId);
    if(content==0)
    {
        const len = 0;
        const result = {len};
        return res.send(response(baseResponse.SUCCESS,result));
    }
    else
    {
        const ostResult = await contentProvider.retrieveOst(content);
        const img = ostResult.img;
        const url = ostResult.url;
        const name = ostResult.name;
        const len = 1;
        const result = {len,img, url,name};
        return res.send(response(baseResponse.SUCCESS,result));
    }

};

exports.postLikedList = async function (req, res) {
    const userIdResult = req.body.userId;
    const userIdres = await userProvider.retrieveUserId(userIdResult);
    const userId = userIdres['id']
    const contents = await contentProvider.retrieveLikeContentId(userId);
    contentList = []
    for(var i=0;i<contents.length;i++)
    {
        contentList.push(String(contents[i].contentId))
    }
    const content = await contentProvider.retrieveContentName(contentList);
    getContentRes = []
    for(var i=0;i<content.length;i++)
    {
        const tmp = await contentProvider.retrieveContentByName(content[i]);
        const cName = tmp[0].name;
        const csSrc = tmp[0].src;
        const tmp2 = {cName,csSrc};
        getContentRes.push(tmp2);
    }
    return res.send(response(baseResponse.SUCCESS,getContentRes))
};

// /** API No. 2 [GET]컨텐츠 리스트 API **/
exports.postRecommend = async function (req, res) {
    const userIdResult = req.body.userId;
    const userIdres = await userProvider.retrieveUserId(userIdResult);
    const userId = userIdres['id']
    const result = await contentProvider.retrieveRContent(userId);
    return res.send(response(baseResponse.SUCCESS,result))
};

exports.ostInfo = async function (req, res) {
    const userId = req.body.userId;
    const platfrom = req.body.platform;
    const platformEmail = req.body.email;

    const userIdres = await userProvider.retrieveUserId(userId);
    if(userIdres==undefined){
        return res.send(response(baseResponse.DB_ERROR));
    }else{
        const id = userIdres.id;
        const InsertQuery = [id,platfrom,platformEmail];
        const InsertResult = await contentService.updatePlatform(InsertQuery);
        return res.send(response(baseResponse.SUCCESS));
    }
}

exports.getUserPlatform = async function (req, res) {
    const userId = req.body.userId;
    const userIdres = await userProvider.retrieveUserId(userId);
    if(userIdres==undefined){
        return res.send(response(baseResponse.DB_ERROR));
    }else{
        const id = userIdres.id;
        const userPlatformResult = await contentProvider.retrieveUserPlatform(id);
        return res.send(response(baseResponse.SUCCESS,userPlatformResult));
    }
}

exports.deletePlatform = async function (req, res) {
    const paltformId = req.body.id;
    contentService.deleteUserPlatform(paltformId);
    return res.send(response(baseResponse.SUCCESS));
}


exports.addLike = async function (req, res) {
    const userId = req.body.id;
    const contentId = req.body.contentId;
    const userIdres = await userProvider.retrieveUserId(userId);
    if(userIdres==undefined){
        return res.send(response(baseResponse.DB_ERROR));
    }else{
        const id = userIdres.id;
        const InsertQery = [id,contentId]
        contentService.postUserLike(InsertQery);
        return res.send(response(baseResponse.SUCCESS));
    }
}

exports.deleteLike = async function (req, res) {
    const userId = req.body.id;
    const contentId = req.body.contentId;
    const userIdres = await userProvider.retrieveUserId(userId);
    if(userIdres==undefined){
        return res.send(response(baseResponse.DB_ERROR));
    }else{
        const id = userIdres.id;
        const InsertQery = [id,contentId]
        contentService.deleteUserLike(InsertQery);
        return res.send(response(baseResponse.SUCCESS));
    }
}

exports.getUrl = async function (req, res) {
    const userId = req.body.id;
    const contentId = req.body.contentId;
    const userIdres = await userProvider.retrieveUserId(userId);
    if(userIdres==undefined){
        return res.send(response(baseResponse.DB_ERROR));
    }else{
        const id = userIdres.id;
        const Url = [id,contentId]
        const UrlResult = await contentProvider.retrieveURL(Url);
        console.log(UrlResult)
        return res.send(response(baseResponse.SUCCESS,UrlResult));
    }
}