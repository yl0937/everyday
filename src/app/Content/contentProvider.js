const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const contentDao = require("./contentDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveAllContent = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const contentResult = await contentDao.selectContentAll(connection);
  connection.release();

  return contentResult;
};

exports.retrieveTag = async function (tag) {
    const connection = await pool.getConnection(async (conn) => conn);
    const TagResult = await contentDao.selectTagId(connection,tag);
    connection.release();

    return TagResult[0];
};

exports.retrieveContentByTag = async function (tagId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const contentResult = await contentDao.selectContentByTag(connection);
    connection.release();

    return contentResult;
};

exports.retrieveContentByName = async function (name) {
    const connection = await pool.getConnection(async (conn) => conn);
    const contentResult = await contentDao.selectContentByName(connection,name);
    connection.release();

    return contentResult;
};

exports.retrieveUserContentId = async function (usesrId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const contentResult = await contentDao.selectUserContentId(connection,usesrId);
    connection.release();
    if(contentResult.length==0)
    {
        return 0;
    }
    else
    {
        return contentResult[0].contentId;
    }

};

exports.retrieveOst = async function (contentId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const contentResult = await contentDao.selectOst(connection,contentId);
    connection.release();

    return contentResult[0];
};

exports.retrieveLikeContentId = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const contentResult = await contentDao.selectLikeContentAll(connection,userId);
    connection.release();

    return contentResult;
};

exports.retrieveContentName = async function (contentList) {
    content = []
    for(var i=0;i<contentList.length;i++){
        const connection = await pool.getConnection(async (conn) => conn);
        content.push(await contentDao.selectContentName(connection,contentList[i]));
        connection.release();
    }

    return content;
};

exports.retrieveRContent = async function (userId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const content = await contentDao.selectRContent(connection,userId);
    connection.release();
    return content;
};

exports.retrieveUserPlatform = async function (id) {

    const connection = await pool.getConnection(async (conn) => conn);
    const platform = await contentDao.selectUserPlatform(connection,id);
    connection.release();
    return platform;
};

