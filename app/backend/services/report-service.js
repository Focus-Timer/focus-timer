var { getPool } = require('../config/db.js')
var sql = require('mssql');

async function getReport(user) {
  try {
    const pool = await getPool();
    const reportInfo = await pool.request()
      .input('userid', sql.VarChar(255), user.sub)
      .query("SELECT * FROM report \
              WHERE report.userid=@userid;");
    return reportInfo.recordsets[0];
  } catch (error) {
    console.error(error);
    return;
  }
}

async function postReport(user, report) {
  try {
    const pool = await getPool();
    const reportInfo = await pool.request()
      .input("userid", sql.VarChar(255), user.sub)
      .input("pomodoros", sql.Int, report.pomodoros)
      .query('INSERT INTO report (userId, pomodoros) OUTPUT inserted.id, inserted.userid, inserted.pomodoros VALUES (@userid, @pomodoros)');
    return reportInfo.recordsets[0];
  } catch (error) {
    console.error(error);
    return;
  }
}

module.exports = { getReport, postReport };