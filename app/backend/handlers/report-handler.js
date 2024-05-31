var express = require('express');
var router = express.Router();
const cors = require("cors");
const corsOptions = require('../config/cors-middleware.js');
var verifyToken = require('../config/auth-middleware.js');
var ReportService = require('../services/report-service.js');

router.get('/report', cors(corsOptions), verifyToken, async (req, res) => {
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

router.post('/report', cors(corsOptions), verifyToken, async (req, res) => {
  try {
    const user = await ReportService.postReport(req.user, req.report);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ user });
  } catch {
    console.error('Error retrieving user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
