google.load('visualization', '1', {'packages': ['table', 'map', 'corechart']});
google.setOnLoadCallback(start);

function start()    {
    $('.overlay-div').hide();
    
    // Create a new XMLHttpRequest.
    var request = new XMLHttpRequest();
    
    // Handle state changes for the request.
    request.onreadystatechange = function(response) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          // Parse the JSON
          var jsonOptions = JSON.parse(request.responseText);
          
          var dataList = document.getElementById('json-datalist');
          var input = document.getElementById('ajax');
          
          // Loop over the JSON array.
          jsonOptions.forEach(function(item) {
                // Create a new <option> element.
                var option = document.createElement('option');
                // Set the value using the item in the JSON array.
                var teamName = item;
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
                option.value = teamName;
                // Add the <option> element to the <datalist>.
                dataList.appendChild(option);
          });
        }
      }
    };
    
    // Set up and make the request.
    request.open('GET', 'php/getTeams.php', true);
    request.send();
}

function initialize()  {
  // Get the Data from csv file into a table
  var oReq = new XMLHttpRequest(); //New request object
  oReq.onload = function() {
    
    var teamArray = JSON.parse(this.responseText);
    
    // Define table
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Year');
    data.addColumn('number', 'Stage');
    data.addColumn({type:'string', role:'tooltip', label:'Stage of Competition'});
    data.addColumn({type:'string', role:'style'});
    
    var thisYear = new Date().getFullYear();
    var toDate = parseInt(thisYear)+1;

    // Populate the data table from the teamArray
    for(var i=1997;i<=toDate;i++) {
        var year=i.toString();
        var stagetext="-";
        var stage=0;
        if(parseInt(teamArray[i].stage)!=0) {
            var stage=9-parseInt(teamArray[i].stage);
        }
        if(teamArray[i].stagetext!=null) {
            stagetext=teamArray[i].stagetext;
        }
      
        var color='black'; var stagetext="";
        
        switch(stage) {
            case 8: color='gold'; stagetext='Winner';
                break;
            case 7: color='silver'; stagetext='Runner-Up';
                break;
            case 6: color='#CD7F32'; stagetext='Semi-Finalist';
                break;
            case 5: color='#1F4D0E'; stagetext='Quarter-Finalist';
                break;
            case 4: color='#2A6612'; stagetext='Last 16 Knockout';
                break;
            case 3: color='#348017'; stagetext='Group Stage (16)';
                break;
            case 2: color='#85B374'; stagetext='Group Stage (32)'; stage=1;
                break;
            case 1: color='#5D9945'; stagetext='Group Stage (24)'; stage=2;
                break;
        }
      
        data.addRow([ year, stage, stagetext, color ]);
    }
    
    var Last32="Last 32";var Last24="Last 24";var Last16="Last 16";
    var QuarterFinal="Quarter-Final";var SemiFinal="Semi-Final";var RunnerUp="Runner-Up";var Winner="Winner";
    
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, {
        'vAxis': {
            'minValue': 0,
            'maxValue': 8,
            'gridlines': { 'count': 9 },
            'textPosition': 'none'
        },
        'hAxis': {
            'minValue': 1997,
            'maxValue': 2016,
         },
        'legend': 'none'
    });

    
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 2]);

    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(view, {showRowNumber: false, width: '100%', height: '100%', page: 'enable', pageSize: 5});
    
    $('.overlay-div').show();

  };
  
  var phpTeam=document.getElementById('ajax').value;
    phpTeam=phpTeam.replace(" ","+");
    phpTeam=phpTeam.replace(" ","+");
    phpTeam=phpTeam.replace(" ","+");
    phpTeam=phpTeam.replace('\340','%88');
    phpTeam=phpTeam.replace('\351','%8E');
    phpTeam=phpTeam.replace('\347','%8D');
    phpTeam=phpTeam.replace('(','%28');
    phpTeam=phpTeam.replace(')','%29');
    phpTeam=phpTeam.replace('\361','%96');
  
  var phpURL="php/getCLTeamHIST.php"+"?team="+phpTeam;
  
  oReq.open("get", phpURL, true);
  oReq.send();
}
