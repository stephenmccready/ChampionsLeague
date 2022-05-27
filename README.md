# ChampionsLeague
UEFA Champions League Knockout Stage Statistics using Google Visualization API<br/>
Currently contains knockout stages from 1997-2021<br/>
<br/>
View demos here:<br/>
&nbsp;http://www.stephenmccready.com/stephenmccready/clhist.html<br/>
&nbsp;http://www.stephenmccready.com/stephenmccready/clteamhist.html<br/>
<br/>
The page uses these resources:<br/>
<b>clhist.html</b><br/>
<b>clteamhist.html</b><br/>
<br/>
<b>js\clhist.js</b> (retreives the data using php\getCLHIST.php and feeds it into a google visualization table that is displayed in a 3D pie chart)<br/>
<b>js\clteamhist.js</b> (retreives the data using php\getCLTeamHIST.php and feeds it into a google visualization table that is displayed in a bar chart)<br/>
<br/>
<b>css\clhist.css</b><br/>
<b>css\clteamhist.css</b><br/>
<br/>
<b>php\getCLHIST.php</b> (reads and parses out data\CLHIST.csv by chosen date range, weighting and stage(s))<br/>
<b>php\getCLTeamHIST.php</b> (reads and parses out data\CLHIST.csv by chosen team)<br/>
<b>php\getTeams.php</b> (gets list of unique team names from data\CLHIST.csv for datalist in clteamhist.html)<br/>
<br/>
<b>data\CLHIST.csv</b> (contains list of teams and stages reached in the CL group and knockout stages)<br/>
