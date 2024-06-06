var { getPool } = require('../config/db.js')
var sql = require('mssql');
const moment = require('moment');
const { report } = require('../handlers/other.js');

async function getReport(user, weekStart) {
  try {
    const pool = await getPool();
    const startDate = moment(weekStart).startOf('day');
    const endDate = moment(weekStart).add(6, 'days').endOf('day');
    const reportInfo = await pool.request()
      .input('userid', sql.VarChar(255), user.sub)
      .input('startDate', sql.DateTime, startDate.toDate())
      .input('endDate', sql.DateTime, endDate.toDate())
      .query(`
          SELECT 
            CAST(report.date AS DATE) as date, 
            SUM(report.pomodoros) as pomodorosTotal
          FROM report
          WHERE report.userid = @userid
          AND report.date >= @startDate
          AND report.date <= @endDate
          GROUP BY CAST(report.date AS DATE)
          ORDER BY date;
    `);

    return reportInfo.recordsets[0];
  } catch (error) {
    console.error(error);
    return;
  }
}


async function postReport(user, pomodoros) {
  try {
    const pool = await getPool();
    const now = new Date();
    const hoursAfterMidnight = now.getHours();

    const pomodoroHours = Math.floor(pomodoros / 4) * 2.167 + Math.floor(pomodoros % 4) * 0.5;
    const currentDaysPomodoros = await getCurrentDaysReport(user, now);

    if (pomodoroHours < hoursAfterMidnight && pomodoros < (44 - currentDaysPomodoros.pomodorosTotal)) {
      const reportInfo = await pool.request()
        .input("userid", sql.VarChar(255), user.sub)
        .input("pomodoros", sql.Decimal(4, 2), pomodoros)
        .query('INSERT INTO report (userId, pomodoros) OUTPUT inserted.id, inserted.userid, inserted.pomodoros VALUES (@userid, @pomodoros)');
      return reportInfo.recordsets[0];

    } else {
      const errorMessage = `Possible number of pomodoros exceeded for day and time`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

  } catch (error) {
    console.error(error);
    return;
  }
}

async function getCurrentDaysReport(user, day) {
  try {
    const pool = await getPool();
    const startDate = moment(day).startOf('day');
    const endDate = moment(day).endOf('day');
    const reportInfo = await pool.request()
      .input('userid', sql.VarChar(255), user.sub)
      .input('startDate', sql.DateTime, startDate.toDate())
      .input('endDate', sql.DateTime, endDate.toDate())
      .query(`
          SELECT 
            CAST(report.date AS DATE) as date, 
            SUM(report.pomodoros) as pomodorosTotal
          FROM report
          WHERE report.userid = @userid
          AND report.date >= @startDate
          AND report.date <= @endDate
          GROUP BY CAST(report.date AS DATE)
          ORDER BY date;
    `);
    if (reportInfo.recordsets[0].length === 0) return { pomodorosTotal: 0 };
    return reportInfo.recordsets[0][0];
  } catch (error) {
    console.error(error);
    return;
  }
}

module.exports = { getReport, postReport };