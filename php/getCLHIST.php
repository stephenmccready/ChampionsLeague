<?php
ini_set('auto_detect_line_endings',TRUE);

$filepath="..\data\CLHIST.csv";
$startYYYY=$_GET["startYYYY"];
$endYYYY=$_GET["endYYYY"];
$last32=$_GET["last32"];
$last24=$_GET["last24"];
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
           and (     (   $data[2]=="7. First Group Stage" && $last32=="true")   // 2000-2007
                or   (   $data[2]=="7. Group Stage" && $last32=="true")         // 2007-
                or   (   $data[2]=="8. Group Stage" && $last24=="true")         // Pre 2000
                or   (   $data[2]=="6. Second Group Stage" && $last16=="true")  // 2000-2007
                or   (   $data[2]=="5. Last 16" && $last16=="true")             // 2007 -
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
                        case "7. First Group Stage": $points=1; break;  // 2000-2007
                        case "7. Group Stage": $points=1; break;        // 2007-
                        case "8. Group Stage": $points=2; break;        // Pre 2000
                        case "6. Second Group Stage": $points=4; break; // 2000-2007
                        case "5. Last 16": $points=4; break;            // 2007 -
                        case "4. Quarterfinalist": $points=8; break;
                        case "3. Semifinalist": $points=16; break;
                        case "2. Runner Up": $points=32; break;
                        case "1. Winner": $points=64; break;
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
