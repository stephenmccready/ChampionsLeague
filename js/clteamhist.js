google.load('visualization', '1', {'packages': ['table', 'map', 'corechart']});
google.setOnLoadCallback(start);

function start()    {
    $('.overlay-div').hide();
    
    // Create a new XMLHttpRequest.
    var request = new XMLHttpRequest();
    
    // Handle state changes for the request.
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          // Parse the JSON
          var jsonOptions = JSON.parse(request.responseText);
          
          var dataList = document.getElementById('json-datalist');
 //         var input = document.getElementById('ajax');
          
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
                teamName=teamName.replace('%28','(');
                teamName=teamName.replace('%29',')');
                option.value = teamName;
                // Add the <option> element to the <datalist>.
                dataList.appendChild(option);
                document.getElementById('divDebug').innerHTML+=teamName+' . ';
          });
        }
      }
        // Hack for Browsers that do not suppore the datalist
        if (!('options' in document.createElement('datalist'))) {
            var availableTags = $('#json-datalist').find('option').map(function () {
                    return this.value;
                }).get();
            $('#ajax').autocomplete({ source: availableTags });
        }
    };
    
    // Set up and make the request.
    request.open('GET', 'php/getTeams.php', true);
    request.send();
}

function initialize()  {
  // Clear out the chart container
  document.getElementById('chart_div').innerHTML='';
  document.getElementById('table_div').innerHTML='';
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
    var d=new Date();
    var thisYear = d.getFullYear();
    var thisMonth = d.getMonth()+1;
    var toDate = parseInt(thisYear);
    if(thisMonth > 8) {
        toDate++;
    }

    // Populate the data table from the teamArray
    for(var i=1994;i<=toDate;i++) {
        var year=i.toString();
        var stagetext="-";
        var stage=0;
        if(parseInt(teamArray[i].stage)!==0) {
            stage=9-parseInt(teamArray[i].stage);
        }
        if(teamArray[i].stagetext!==null) {
            stagetext=teamArray[i].stagetext;
        }
      
        var color='black';
        
        switch(stage) {
            case 8: color='gold'; stagetext='Winner'; break;
            case 7: color='silver'; stagetext='Runner-Up'; break;
            case 6: color='#CD7F32'; stagetext='Semi-Finalist'; break;
            case 5: color='#1F4D0E'; stagetext='Quarter-Finalist'; break;
            case 4: color='#2A6612'; stagetext='Last 16 Knockout'; break;
            case 3: color='#348017'; stagetext='Group Stage (16)'; break;
            case 2: color='#85B374'; stagetext='Group Stage (32)'; stage=1; break;
            case 1: color='#5D9945'; stagetext='Group Stage (24)'; stage=2; break;
        }
      
        data.addRow([ year, stage, stagetext, color ]);
    }
    
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, {
        'vAxis': {
            'minValue': 0,
            'maxValue': 8,
            'gridlines': { 'count': 9 },
            'textPosition': 'none'
        },
        'legend': 'none',
    });
    
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 2]);

    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(view, {showRowNumber: false, width: '20em', page: 'enable', pageSize: 5,
        'cssClassNames': { headerCell: 'headerCell', tableRow: 'tableRow', tableCell: 'tableCell'}
        });
    
    $('.overlay-div').show();
  };
  
  var phpTeam=document.getElementById('ajax').value;
    phpTeam=phpTeam.replace(" ","+");
    phpTeam=phpTeam.replace(" ","+");
    phpTeam=phpTeam.replace(" ","+");
    phpTeam=phpTeam.replace('(','%28');
    phpTeam=phpTeam.replace(')','%29');
  
  var phpURL="php/getCLTeamHIST.php"+"?team="+phpTeam;
  
  oReq.open("get", phpURL, true);
  oReq.send();
}
