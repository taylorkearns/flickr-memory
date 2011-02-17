<!DOCTYPE HTML>  
<html>
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="author" content="">
    
    <title></title>
    
    <link rel="stylesheet" href="/css/global.css" />
    <link rel="shortcut icon" href="/favicon.ico">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js"></script>  
</head>

<body>
    
<div id="wrapper">
    <h1>flickr memory</h1>
    
    <section id="photo-well"></section> <!-- #photo-well -->
    
    <section id="score-card">
        <h2>score</h2>
        <div id="tally"></div>
    </section> <!-- #score-card -->
    
    <section id="scoreboard">
        <h2>scoreboard</h2>
    </section> <!-- #scoreboard -->

    <section id="gallery-selector">
        <h2>galleries</h2>
        <p>Click on a gallery in the list below, or enter any <a href="http://www.flickr.com/galleries/" target="_blank">Flickr gallery</a> URL into the input field.  Better yet, create your own gallery and enter that URL!</p>
        <form id="custom-gallery">
            <input type="text" id="url" placeholder="enter gallery URL" />
            <input type="submit" class="button" value="go" />
        </form>
        <ul>
            <li><a href="http://www.flickr.com/photos/taylorkearns/galleries/72157625863370830">idaho</a></li>
            <li><a href="http://www.flickr.com/photos/taylorkearns/galleries/72157625942950676">los angeles</a></li>
            <li><a href="http://www.flickr.com/photos/taylorkearns/galleries/72157625941911836">boston</a></li>
        </ul>
    </section> <!-- #gallery-selector -->
    
    <div id="user-scores-entry">
        <p>Nice work! Enter your name to be added to the scoreboard.</p>
        <form id="user-scores" action="#" method="post">
            <br />
            <label for="player_name">name:</label>
            <input type="text" id="player_name" disabled="disabled" />
            <br /><br />
            <input type="submit" id="score-submit" value="post my score" />
            <input type="button" id="score-cancel" value="no thanks" />
        </form>
    </div> <!-- #user-scores-entry -->
    
</div> <!-- #wrapper -->

<!--
Scripts
-->
<script src="/js/core.js"></script>

</body>
</html>