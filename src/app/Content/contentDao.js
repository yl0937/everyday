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
        SELECT img,url,name FROM contentost where contentId = ?;
                 `;
    const [contentRow] = await connection.query(selectContentTagQuery,contentId);
    return contentRow;
}


module.exports = {
  selectContentAll,
  selectTagId,
  selectContentByTag,
  insertUserInterest,
  selectContentByName,
  selectUserContentId,
  selectOst

};
