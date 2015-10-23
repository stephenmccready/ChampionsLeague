# ChampionsLeague
UEFA Champions League Knockout Stage Statistics using Google Visualization API<br/>
Currently contains knockout stages from 1997-2016<br/>
<br/>
View demos here:<br/>
&nbsp;http://www.stephenmccready.com/clhist.html<br/>
&nbsp;http://www.stephenmccready.com/clteamhist.html<br/>
<br/>
The page uses these resources:<br/>
clhist.html<br/>
clteamhist.html<br/>
<br/>
js\clhist.js (retreives the data using php\getCLHIST.php and feeds it into a google visualization table that is displayed in a 3D pie chart)<br/>
js\clteamhist.js (retreives the data using php\getCLTeamHIST.php and feeds it into a google visualization table that is displayed in a bar chart)<br/>
<br/>
css\clhist.css<br/>
css\clteamhist.css<br/>
<br/>
php\getCLHIST.php (reads and parses out data\CLHIST.csv by chosen date range, weighting and stage(s))<br/>
php\getCLTeamHIST.php (reads and parses out data\CLHIST.csv by chosen team)<br/>
<br/>
data\CLHIST.csv (contains list of teams and stages reached in the CL group and knockout stages)<br/>
