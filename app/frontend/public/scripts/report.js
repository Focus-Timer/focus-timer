let currentWeekStartDate = new Date();
let currentWeekEndDate = new Date();
let currentWeekStart = currentWeekStartDate.getDate() - currentWeekStartDate.getDay() + 1;
const xValues = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saterday', 'Sunday'];

showReportButton.onclick = () => {
    // BACKEND CALL TO GET REPORT INFO
    main.classList.add('blur');
    reportDialog.style.visibility = 'visible';
}

closeReportButton.onclick = () => {
    main.classList.remove('blur');
    reportDialog.style.visibility = 'hidden';
}

prevWeekButton.onclick = () => {
    currentWeekStart -= 7;
    updateChart();
}
                            
nextWeekButton.onclick = () => {
    currentWeekStart += 7;
    updateChart();
}

reportSummaryButton.onclick = () => {
    reportContentDescription.textContent = 'Activity Summary';
    line.style.width = '70%';
    reportContent.innerHTML = `<section class="report-content-container">
    <div class="activity-card">
    <div class="activity-card--left">
      <svg width="70" height="70" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" stroke="white" stroke-width="4"/>
        <g transform="translate(28, 8)">  <path d="M4 4V27H24.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    </div>
    <div class="activity-card--right">
      <h3>0</h3>
      <p>hours focused</p>
    </div>
  </div>
  <div class="activity-card">
    <div class="activity-card--left">
      <svg width="70" height="70" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="70" height="70" fill="url(#pattern0_9_266)"/>
        <defs>
        <pattern id="pattern0_9_266" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_9_266" transform="scale(0.02)"/>
        </pattern>
        <image id="image0_9_266" width="50" height="50" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7klEQVR4nO2aSw6DMBBDfTxWvf86DedwFUFphRII/xnw29ERDg8HugGohGRD8s0fIf1We/7V+QN98JgAJ/kD3+TSsfV8fyIkXyRbzjBeaG9Qn5+u9ZUTaXdeaBVYlh9nqz2s+p3yWZo/SSRYev1yg0gzWuyIP8RQm79axBqUiLdGvIHbi8AJlIgx+PhGaOVh3trI7URgYJaQCNVIBzL0I22txKK78z8/G8xcj0RgYLZLIxZmCYlQjXQgw6Vb62wgkQJTd+js2eR89YkSgRpJaGvxInBUI+5FrEGJGINPaCTSH7H0CYcnmZj9hEPABh9/SM+9eNEVxgAAAABJRU5ErkJggg=="/>
        </defs>
      </svg>              
    </div>
    <div class="activity-card--right">
      <h3>0</h3>
      <p>days accessed</p>
    </div>
  </div>
  <div class="activity-card">
    <div class="activity-card--left">
      <svg width="70" height="70" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="90" height="90" fill="url(#pattern0_9_267)"/>
        <defs>
        <pattern id="pattern0_9_267" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_9_267" transform="scale(0.0111111)"/>
        </pattern>
        <image id="image0_9_267" width="70" height="70" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEs0lEQVR4nO3dW4xdUxjA8eVS2kpdI0GFVBARxCVFJHjoJSVE4tI3Dw0RQlMkHqqthAxlaMQtiMYlFKGCJ9JIECWShhIaQjUpRqh22upFx6V/WTkrcTKz55y911p7f9/ae/+eJpPZ51vfl501e6/bMabVarVarVarkYADgAeAX4AhYKn9nXS7age4n7FeAvaRblut0LmTsyySblttAAcxvr3AldJtrAVgGr3tAE6RbmfygPPoby0wUbqtSQNuJJ/HpduaNGAF+V0u3d4kAfu65+a87N8eKt3u5AAzKe5Z6XYnB3gZP3Ok254M4GjgT89Cb2ifQvIX+mHCLCz3VqgB4Chgd2Ch/7CfI52LasBy4lgunYv2N8F/IxXafs4Z0jmpA+wHrCGuV6XzUge4g/j+AU6Szk0N4OQI/wDH85R0fpq6jNWUZ499LjdNB9xJ+QZMkwFnAyMVFHqjHaQyTQRMBL6iOhebJgKeoFrNe4EB5rjJ1Spt6zfYBEwAHgJ+A353P08wKbKD88DPyOg5aw4MZlyzzKQIeB45T/e5m4czrtmd3MwNcBmyfujRthk9rrvFpAI4rOAcYFmmekwEf2FSAbyIDldktO2IHDM60412CrqMbndntO8e+nvGJPBish49Voxq31S3tKyf7aqXCwOL0eXjUe17s8C1s4xGwDHATnTZ2NW+2wte+6jRCHgMfYZd2+Z6TJttMNoAx7qxYG1GgAVu9sXHaUYTu8KTelpotAAOUdg3x/KJ0QKYT339DUwxGlQ8oC9htpbpqbob0FDou6i/9zUUOvZqI422i24oBY6MuHZOuxMlCz2b5rimbuvnRrOrmq5D3mLJQtvN8GXZBdxg+0bgZuQ9J1noT0tcaXSW59BmWT6ULPS3JST0E3D8qDhfIu97yUL/GjmZYeDUjDibkbdJpsqdAsQeFp03Thy7ikjanuor/H8BfPcGZvlgvJeCkrqookaqr3D/02J8TO8R5zWUzNSIANZFSmJNnzjXI+/H6io7tgBvRUpiSY6JBbs6VNLa6io7tgBLIiUxM0esAWS9UU1Vs5O/pMz1cd2AyfZZFjkPGinApJyrfvqZnDPe+YIz7ZmPnimcs9FtUoF485AhezoZcGmEJE4oGHMR1dosfpKkG10LnZyd5RHXnllalVeMBsC1gYkMesa9l2rMNYq2HX8WkMi6gNh51jqHjovrWNfR9UQQMn94odJi69uvCDwSkNBKpWv/zjHaAAcCn3smtBc4N/CfcuytdquM8rM4tngm9lHIY5Q7Tf3diIW+wGhm+9uAN7ibIuzUtWfhhQrqyioDXO1WYha1M/S4HtsFecbuftI4zqQCuAr4yyPRb4CDA2MvCyj0fJMa94q+wyPZt4H9A+JO8dy5u0r8ddsXcKZbRlDUC/ZlKCDubQXjfQccblJGZ0HkOx7FXul7Z7u7emvOOFtr8/0BdJ51b3VniRZxX0DMJ3N8vp3Nn2Hqhs424dcLFHpLibNAu/JMpSWNThG+zlHoocC31W09xpkvMk1ApzuxBX+vR6GXBsbIOtLHDhVMM00EnO5G4la77QxD7ruzgk4ZcMf6DLpDqja5Q6pyT5+1Wq1Wq9VqmWT8B0EqHT0ubudTAAAAAElFTkSuQmCC"/>
        </defs>
        </svg>              
    </div>
    <div class="activity-card--right">
      <h3>0</h3>
      <p>day streak</p>
    </div>
  </div>
  </section>`;
    reportSummaryButton.classList.add('report-button-active');
    reportDetailButton.classList.remove('report-button-active');
}

reportDetailButton.onclick = () => {
    reportContentDescription.textContent = 'Focus Hours';
    line.style.width = '78.4%';
    reportContent.innerHTML = `<section class="graph-container">
                                <canvas id="focus-hours-chart" class="line-graph"></canvas>
                                <footer class="graph-footer">
                                    <button class="prev-week-btn">Prev Week</button>
                                    <p class="current-week">03/06/2024 to 10/06/2024</p>
                                    <button class="next-week-btn">Next Week</button>
                                </footer>
                                </section>`;
    updateChart();
    reportSummaryButton.classList.remove('report-button-active');
    reportDetailButton.classList.add('report-button-active');
}

function updateChart() {
    var firstday = new Date(currentWeekStartDate.setDate(currentWeekStart));
    var lastday = new Date(currentWeekEndDate.setDate(currentWeekStart + 6));
    console.log(firstday);
    console.log(lastday);
    // MAKE API CALL WITH formatDate(firstDay) to populate y-values
    const yValues = [1, 0, 0, 3, 5, 12, 18];
    new Chart("focus-hours-chart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
          }]
        },
        options: {
          legend: {display: false}
        }
      });
}


function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
