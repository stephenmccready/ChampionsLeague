<?php
ini_set('auto_detect_line_endings',TRUE);

$filepath="..\data\CLHIST.csv";
$team = $_GET["team"];
$teamArray = array();
/* .csv layout is
    0 Year
    1 Team
    2 Stage of Competition
    3 Country of the teams domestic league
*/
$i=1997;
$toYear=date("Y")+1;
for ($i; $i<=$toYear; $i++) {
    $newdata = array (
                    'year' => strval($i),
                    'team' => $_GET["team"],
                    'stage' => strval(0),
                    'stagetext' => "-",
                    'country' => ""
                );
    $teamArray[$i] = $newdata;
}

if (($handle = fopen($filepath, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",", "\"")) !== FALSE) {
        if(strtoupper($team)==strtoupper(urldecode(str_replace('%20','+',$data[1])))) {
            foreach($teamArray as &$value) {
                if($value['year'] == $data[0]) {
                   if(substr($data[2],0,1) < $value['stage'] || $value['stage'] == strval(0)) {
                        $value['team'] = urlencode($data[1]);
                        $value['stage'] = substr($data[2],0,1);
                        $value['stagetext'] = $data[2];
                        $value['country'] = $data[3];
                    }
                    break; // Stop the loop after we've found the item
                }
            }
        }
    }
    fclose($handle);
}

echo json_encode($teamArray);
