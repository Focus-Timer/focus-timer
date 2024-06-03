showReportButton.onclick = () => {
    main.classList.add('blur');
    reportDialog.style.visibility = 'visible';
}

closeReportButton.onclick = () => {
    main.classList.remove('blur');
    reportDialog.style.visibility = 'hidden';
}

reportSummaryButton.onclick = () => {
    reportSummaryButton.classList.add('report-button-active');
    reportDetailButton.classList.remove('report-button-active');
    reportRankingButton.classList.remove('report-button-active');
}

reportDetailButton.onclick = () => {
    reportSummaryButton.classList.remove('report-button-active');
    reportDetailButton.classList.add('report-button-active');
    reportRankingButton.classList.remove('report-button-active');
}

reportRankingButton.onclick = () => {
    reportSummaryButton.classList.remove('report-button-active');
    reportDetailButton.classList.remove('report-button-active');
    reportRankingButton.classList.add('report-button-active');
}

reportWeekButton.onclick = () => {
    reportWeekButton.classList.add('report-button-active');
    reportMonthButton.classList.remove('report-button-active');
}

reportMonthButton.onclick = () => {
    reportWeekButton.classList.remove('report-button-active');
    reportMonthButton.classList.add('report-button-active');
}
