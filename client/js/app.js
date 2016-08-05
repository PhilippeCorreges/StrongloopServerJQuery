/**
 * Created by IOSoftwareSAS on 05/08/2016.
 */
var male = 0;
var female = 0;
var breedCount = [];

$(document).ready(function() {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(loadData);
});

function loadData() {
  $.get('http://localhost:3000/api/cats/breeds').then(function(result) {
    console.log('Breeds',result);
    breeds = result;
    var defs = [];
    breeds.forEach(function(b) {
      defs.push($.get('http://localhost:3000/api/cats/count?where[breed]='+b));
    });

    $.when.apply($, defs).then(function() {
      for(var i=0;i<breeds.length;i++) {
        var count = arguments[i][0].count;
        breedCount[breeds[i]] = count;
      }
      console.log(breedCount);
      drawBreedChart();
    });

  });
}

function drawBreedChart() {

  console.log('drawBreedChart');

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Breed');
  data.addColumn('number', 'Count');

  //convert our nice ob into an array
  var bData = [];
  breeds.forEach(function(b) {
    bData.push([b, breedCount[b]]);
  });
  data.addRows(bData);

  // Set chart options
  var options = {
    'title':'Cats by Breed',
    'width':500,
    'height':500
  };

  var chart = new google.visualization.PieChart(document.getElementById('breed_div'));
  chart.draw(data, options);

}
