// 전체 컨텐츠 리스트 조회
async function selectContentAll(connection) {
  const selectContentAllQuery = `
                 SELECT *
                 FROM Content;
                 `;
  const [contentRow] = await connection.query(selectContentAllQuery);
  return contentRow;
}

// 태그 아이디 조회(컨텐츠 필터링 전처리)
async function selectTagId(connection,tag) {
  const selectTagQuery = `
                 SELECT id
                 FROM Interest
                 WHERE name=?
                 `;
  const [contentRow] = await connection.query(selectTagQuery,tag);
  return contentRow;
}

// 컨텐츠-태그 조회
async function selectContentByTag(connection,tagId) {
  const selectContentTagQuery = `
                 SELECT *
                 FROM Content
                 `;
  const [contentRow] = await connection.query(selectContentTagQuery,tagId);
  return contentRow;
}

// 컨텐츠-태그 조회
async function selectContentByName(connection,name) {
    const selectContentTagQuery = `
        SELECT *
        FROM Content where name like ?;
                 `;
    const [contentRow] = await connection.query(selectContentTagQuery,name);
    return contentRow;
}

// 유저 관심사 추가
async function insertUserInterest(connection,insertInfo) {
    const insertUserInterestQuery = `
        INSERT INTO UserInterest(userId,interestId) 
        VALUES (?,?);
                 `;
    const [InsertRow] = await connection.query(insertUserInterestQuery,insertInfo);
    return InsertRow;
}

// 컨텐츠-태그 조회
async function selectUserContentId(connection,userId) {
    const selectContentTagQuery = `
        SELECT contentId FROM viewlist where userId = ? ORDER BY contentId DESC LIMIT 1;
                 `;
    const [contentRow] = await connection.query(selectContentTagQuery,userId);
    return contentRow;
}

// 컨텐츠-태그 조회
async function selectOst(connection,contentId) {
    const selectContentTagQuery = `
        SELECT img,url,name FROM Contentost where contentId = ?;
                 `;
    const [contentRow] = await connection.query(selectContentTagQuery,contentId);
    return contentRow;
}

// 컨텐츠-태그 조회
async function selectLikeContentAll(connection,userId) {
    const selectContentTagQuery = `
        SELECT contentId FROM likedlist where userId = ?;
                 `;
    const [contentRow] = await connection.query(selectContentTagQuery,userId);
    return contentRow;
}

// 컨텐츠-태그 조회
async function selectContentName(connection,contentId) {
    const selectContentTagQuery = `
        select name from Content where id = ?;
                 `;
    const [contentRow] = await connection.query(selectContentTagQuery,contentId);
    return contentRow[0].name;
}

// 컨텐츠-태그 조회
async function selectRContent(connection,userId) {
    const selectContentTagQuery = `
        select name,src from Content where id in (
            select contentId from Contentgenre where Contentgenre.genre in
                                                     (select interestId from UserInterest where userId=?)) limit 5;
                 `;
    const [contentRow] = await connection.query(selectContentTagQuery,userId);
    return contentRow;
}

async function insertUserPlatform(connection,query) {
    const insertPlatformQuery = `
        insert into Userpayinfo (userId, platform,email) values (?,?,?);
                 `;
    const [resultRow] = await connection.query(insertPlatformQuery,query);
    return resultRow;
}

async function selectUserPlatform(connection,id) {
    const insertPlatformQuery = `
        select platform, email, date(createdAt) as createdAt,id from Userpayinfo where userId=?;
                 `;
    const resultRow = await connection.query(insertPlatformQuery,id);
    return resultRow[0];
}

async function deleteUserPlatform(connection,id) {
    const deletePlatformQuery = `
        delete from Userpayinfo where id = ?;
                 `;
    const resultRow = await connection.query(deletePlatformQuery,id);
    return resultRow[0];
}

async function insertUserLike(connection,insertInfo) {
    const insertUserInterestQuery = `
        insert into likedlist (userId, contentId) values (?,?);
                 `;
    const [InsertRow] = await connection.query(insertUserInterestQuery,insertInfo);
    return InsertRow;
}

async function deleteUserLike(connection,insertInfo) {
    const deleteUserInterestQuery = `
        delete from likedlist where userId = ? and contentId = ?;
                 `;
    const [Row] = await connection.query(deleteUserInterestQuery,insertInfo);
    return Row;
}

async function retriveUrl(connection,insertInfo) {
    const insertUserInterestQuery = `
        select url from Contentplatform where platformId in (select platform from Userpayinfo where userId=?) and contentId=? LIMIT 1;
                 `;
    const [InsertRow] = await connection.query(insertUserInterestQuery,insertInfo);
    return InsertRow;
}


module.exports = {
  selectContentAll,
  selectTagId,
  selectContentByTag,
  insertUserInterest,
  selectContentByName,
  selectUserContentId,
  selectOst,
  selectLikeContentAll,
  selectContentName,
  selectRContent,
  insertUserPlatform,
  deleteUserPlatform,
  selectUserPlatform,
    insertUserLike,
    deleteUserLike,
    retriveUrl
};
