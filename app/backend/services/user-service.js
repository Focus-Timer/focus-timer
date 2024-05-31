var { getPool } = require('../config/db.js')
var sql = require('mssql');

async function getUser(user) {
  try {
    const pool = await getPool();
    const userInfo = await pool.request()
      .input('userid', sql.VarChar(255), user.sub)
      .query("SELECT * FROM users \
              WHERE users.user_id=@userid;");
    return userInfo.recordsets;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function signIn(user) {
  try {
    const pool = await getPool();
    const userInfo = await pool.request()
      .input('userid', sql.VarChar(255), user.sub)
      .input('username', sql.VarChar(255), user.username)
      .query(`IF NOT EXISTS (select * from users where userid=@userid)
              BEGIN
                INSERT INTO users (userid, username)
                OUTPUT inserted.id, inserted.userid, inserted.username
                VALUES (@userid, @username)
              END
              else
              BEGIN
                SELECT * FROM users WHERE userid = @userid
              END;
            `);
    return userInfo.recordsets[0];
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = { getUser, signIn };