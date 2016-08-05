/**
 * Created by IOSoftwareSAS on 05/08/2016.
 */
var male = 0;
var female = 0;

$(document).ready(function() {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(loadData);
});

function loadData() {
  //get male vs female
  $.get('http://localhost:3000/api/cats/count?where[gender]=Male').then(function(result) {
    male = result.count;
    $.get('http://localhost:3000/api/cats/count?where[gender]=Female').then(function(result) {
      female = result.count;
      drawChart();
    });
  });
}

function drawChart() {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Gender');
  data.addColumn('number', 'Count');
  data.addRows([
    ['Male', male],
    ['Female', female]
  ]);

  // Set chart options
  var options = {
    'title':'Cats by Gender',
    'width':400,
    'height':400
  };

  // Instantiate and draw chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
