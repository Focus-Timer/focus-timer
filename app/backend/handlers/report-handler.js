var express = require('express');
var router = express.Router();
const cors = require("cors");
const { body, validationResult } = require('express-validator');
const corsOptions = require('../config/cors-middleware.js');
var verifyToken = require('../config/auth-middleware.js');
var ReportService = require('../services/report-service.js');

router.get('/getReport', cors(corsOptions), verifyToken, async (req, res) => {
  try {
    const report = await ReportService.getReport(req.user);
    if (!report) {
      return res.status(404).send({ message: 'Report for user not found' });
    }
    res.status(200).send({ report });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/postReport', cors(corsOptions), verifyToken, body('pomodoros').isInt({ min: 1, max: 43 }).withMessage('Pomodoros must be an integer between 1 and 43'), async (req, res) => {
  try {
    //Do we want to do it this way or is there a better way?
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //End of validation
    const report = await ReportService.postReport(req.user, req.body);
    if (!report) {
      return res.status(404).send({ message: 'Report not posted' });
    }
    res.send({ report });
  } catch {
    console.error('Error posting report:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
