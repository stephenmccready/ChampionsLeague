<?php
ini_set('auto_detect_line_endings',TRUE);

$filepath="..\data\CLHIST.csv";
$teams = array();

/* .csv layout is
    0 Year
    1 Team
    2 Stage of Competition
    3 Country the teams domestic league
*/
  
if (($handle = fopen($filepath, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",", "\"")) !== FALSE) {  

        if(!in_array(urlencode($data[1]), $teams)) {    
            $teams[] = urlencode($data[1]);
        }
    }
    fclose($handle);
}

sort($teams);

// teams array contains array of team name
echo json_encode($teams);
