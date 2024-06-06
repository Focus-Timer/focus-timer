var express = require('express');
var router = express.Router();
const cors = require("cors");
const { body, validationResult } = require('express-validator');
const corsOptions = require('../config/cors-middleware.js');
var verifyToken = require('../config/auth-middleware.js');
var ReportService = require('../services/report-service.js');
const moment = require('moment');
// const authenticateSession = require('../config/auth-middleware.js');

router.get('/getReport', cors(corsOptions), verifyToken, validateWeekStart, async (req, res) => {
  try {
    const report = await ReportService.getReport(req.user, req.body['week-start']);
    if (!report) {
      return res.status(404).send({ message: 'Report for user not found' });
    }
    res.status(200).send({ report });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/postReport', cors(corsOptions), verifyToken, validatePomodoros, async (req, res) => {
  try {
    const report = await ReportService.postReport(req.user, req.body['pomodoros']);
    if (!report) {
      return res.status(404).send({ message: 'Report not posted because you are attempting the post an invalid pomodoro amount (Eg: It is most likely that your pomodoro amount exceeds the daily limit of 43 including previous submissions or you are attempting to submit 16 hours worth of pomodoros when it is only 9 in the morning' });
    }
    res.status(200).send({ report });
  } catch {
    console.error('Error posting report:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

//Validation 
async function validatePomodoros(req, res, next) {
  await body('pomodoros').isFloat({ min: 1, max: 44.00 }).withMessage('Pomodoros must be a decimal to two decimal places between 1 and 44').run(req)
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

async function validateWeekStart(req, res, next) {
  const weekStart = req.query['week-start'];

  if (!weekStart) {
    return res.status(400).json({ errors: [{ msg: 'Missing week-start parameter' }] });
  }

  try {
    const date = moment(weekStart, 'YYYY-MM-DD HH:mm:ss', true);
    if (!date.isValid()) throw new Error('Invalid date format, should be YYYY-MM-DD HH:mm:ss');
    if (date.format('HH:mm:ss') !== '00:00:00') throw new Error('Time must be midnight (00:00:00)');
    if (date.day() !== 1) throw new Error('Date must be a Monday');
    if (date.isAfter(moment().startOf('day'))) throw new Error('Date cannot be in the future');
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: error.message }] });
  }

  next();
};

module.exports = router;
