google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {
  // Get the Data from csv file into a table

  var oReq = new XMLHttpRequest(); //New request object
  oReq.onload = function() {
    
    // Get and format the data into the teamArray
    var phpData = this.responseText;
    var teamArray = phpData.split(",");
    
    // Create the dataTable
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'teamName');
    data.addColumn('number', 'appearances');
    
    // Populate the dataTable from the teamArray
    for(var i=0;i<teamArray.length;i++) {
      var team=teamArray[i].split(":");
      var teamName=team[0];
      var appearances=parseInt(team[1]);
      teamName=teamName.replace("{","");
      teamName=teamName.replace("+"," ");
      teamName=teamName.replace("+"," ");
      teamName=teamName.replace("+"," ");
      teamName=teamName.replace('"','');
      teamName=teamName.replace('"','');
      teamName=teamName.replace('%88','\340');
      teamName=teamName.replace('%8E','\351');
      teamName=teamName.replace('%8D','\347');
      teamName=teamName.replace('%28','(');
      teamName=teamName.replace('%29',')');
      teamName=teamName.replace('%96','\361');
      
      data.addRow([ teamName+' ('+appearances.toString()+')', appearances ]);
    }
    
    data.sort([{column: 1, desc: true}, {column: 0}]);
  
    var options = {
      is3D: true,
      chartArea: { left: 20, top: 75 },
    };
    
    if($('input[name="teamOrCountry"]:checked').val()=="team") {
      document.getElementById('spanTeams').innerHTML=" ("+data.getNumberOfRows()+")";
      document.getElementById('spanCountries').innerHTML="";
    } else {
      document.getElementById('spanTeams').innerHTML="";
      document.getElementById('spanCountries').innerHTML=" ("+data.getNumberOfRows()+")";
    }

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
  };
  
  var phpURL="php/getCLHIST.php"
                    +"?startYYYY="+document.getElementById('startYYYY').value
                    +"&endYYYY="+document.getElementById('endYYYY').value
                    +"&last32="+document.getElementById("last32").checked
                    +"&last16="+document.getElementById("last16").checked
                    +"&qtrfin="+document.getElementById("qtrfin").checked
                    +"&semifn="+document.getElementById("semifn").checked
                    +"&runner="+document.getElementById("runner").checked
                    +"&winner="+document.getElementById("winner").checked
                    +"&weighted="+document.getElementById("weighted").checked
                    +"&teamOrCountry="+$('input[name="teamOrCountry"]:checked').val();
  
  oReq.open("get", phpURL, true);
  oReq.send();
}

// For the date range slider
$(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 2000,
      max: 2016,
      step: 1,
      values: [ 2000, 2016 ],
      slide: function( event, ui ) {
          $( "#startYYYY" ).val( ui.values[ 0 ] );
          $( "#endYYYY" ).val( ui.values[ 1 ] );
          document.getElementById('spanYears').innerHTML=parseInt( $( "#endYYYY" ).val())
                                                  - parseInt( $( "#startYYYY" ).val()) + 1;
          drawChart(); }
    });
    $( "#startYYYY" ).val( $( "#slider-range" ).slider( "values", 0 ) );
    $( "#endYYYY" ).val( $( "#slider-range" ).slider( "values", 1 ) );
    document.getElementById('spanYears').innerHTML=parseInt($( "#slider-range" ).slider( "values", 1 ))
                                                  - parseInt($( "#slider-range" ).slider( "values", 0 )) + 1;
});
