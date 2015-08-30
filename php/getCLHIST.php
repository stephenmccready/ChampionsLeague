<?php
ini_set('auto_detect_line_endings',TRUE);

$filepath="..\data\CLHIST.csv";
$startYYYY=$_GET["startYYYY"];
$endYYYY=$_GET["endYYYY"];
$last16=$_GET["last16"];
$qtrfin=$_GET["qtrfin"];
$semifn=$_GET["semifn"];
$runner=$_GET["runner"];
$winner=$_GET["winner"];
$weighted=$_GET["weighted"];
$teams = array();

/* .csv layout is
    0 Year
    1 Team
    2 Stage of Competition
    3 Country the teams domestic league
*/
  
if (($handle = fopen($filepath, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",", "\"")) !== FALSE) {

        if($data[0]>=$startYYYY and $data[0]<=$endYYYY
           and (     (   $data[2]=="5. Last 16" && $last16=="true")
                or   (   $data[2]=="4. Quarterfinalist" && $qtrfin=="true")
                or   (   $data[2]=="3. Semifinalist" && $semifn=="true")
                or   (   $data[2]=="2. Runner Up" && $runner=="true")
                or   (   $data[2]=="1. Winner" && $winner=="true")     )
           ) {
                if($_GET["teamOrCountry"]=='team') {
                    $i=1;   // Team
                } else {
                    $i=3;   // Country
                }
            
                $key = array_search(urlencode($data[$i]), $teams);
                if($weighted=="true"){
                    switch($data[2]) {
                        case "5. Last 16": $points=1; break;
                        case "4. Quarterfinalist": $points=2; break;
                        case "3. Semifinalist": $points=4; break;
                        case "2. Runner Up": $points=8; break;
                        case "1. Winner": $points=16; break;
                    }
                    
                } else {
                    $points=1;
                }
                
                if($key="") {    
                    $teams[urlencode($data[$i])] = $points;
                } else {
                    $teams[urlencode($data[$i])] += $points;
                }
            }
    }
    fclose($handle);
}

// teams array contains array of team name, number of appearances

echo json_encode($teams);
