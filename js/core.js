/* ==================================================
Global variables
================================================== */
var current_gallery;
var images_showing = 0;
var score = 0;



/* ==================================================
Functions
================================================== */
function isMatch()
{
    var revealed = $("img.revealed");
    return revealed[0].src == revealed[1].src ? true : false;
}



function revealImage()
{
    var mask = $(this).find("div.mask");
    var image = $(this).find("img");
    
    if($("#photo-well div.tile img.revealed").length > 1){ $("#photo-well div.tile img").removeClass("revealed"); }
    mask.hide(100);
    image.addClass("revealed");
    images_showing ++;
    if(images_showing > 1)
    {
        if(isMatch() == true)
        {
            $("img.revealed").siblings(".mask").addClass("permanent");
            $("#tally").text("Match!").animate({ opacity: "0" }, 1000);
            setTimeout(function(){ $("#tally").text(score).animate({ opacity: "1" }, 500); }, 1000);
        }
        else
        {
            $("div.mask:not(.permanent)").delay(1000).show(100);
            if($("#photo-well div.tile").length != $("#photo-well div.permanent").length)
            {
                score ++;
                $("#tally").text(score);
            }    
        }
        
        images_showing = 0;
    }
    
    // end of game
    if($("#photo-well div.tile").length == $("#photo-well div.permanent").length)
    {
        $("#score-card").addClass("completed");
        $("#tally").text("Done!").animate({ opacity: "0" }, 1000);
        setTimeout(function(){ $("#tally").text(score).animate({ opacity: "1" }, 500); }, 1000);
        
        // display score entry form
        $("#user-scores-entry").delay(1000).slideDown(200);
        $("#score-submit").removeAttr("disabled");
    }
    
    return false;
}



function setupTiles(gallery)
{
    $("#photo-well").empty();
    
    score = 0;
    $("#tally").text("0");
    $("#score-card").removeClass("completed");
    
    // get the gallery ID
    $.ajax
    ({
        url: "http://api.flickr.com/services/rest/?method=flickr.urls.lookupGallery&api_key=8997c537cd1ff627d69d2c70b4ef9246&url="+gallery+"&format=json&jsoncallback=?",
        dataType: "json",
        success: function(data)
        {
            var gallery_id = data.gallery.id;
            
            // get the photos from the gallery using the ID from above
            $.ajax
            ({
                url: "http://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=8997c537cd1ff627d69d2c70b4ef9246&gallery_id="+gallery_id+"&format=json&jsoncallback=?",    
                dataType: "json",
                success: function(data)
                {
                    var url_deck= [];
                    var all_photos = data.photos.photo;
                    
                    $.each(all_photos, function(key, value)
                    {
                        var farm_id = this.farm;
                        var server_id = this.server;
                        var id = this.id;
                        var secret = this.secret;
                        var size = "s";
                        var photo_url = "http://farm"+farm_id+".static.flickr.com/"+server_id+"/"+id+"_"+secret+"_"+size+".jpg";
                        url_deck.push(photo_url);
                        url_deck.push(photo_url);
                    });
                    
                    // randomize the URL array
                    var randomized_url_deck = [];
                    $.each(url_deck, function(i, val)
                    {
                        var randomNum = Math.floor(Math.random()*(url_deck.length-1));
                        var spliced_url = url_deck.splice(randomNum, 1);
                        randomized_url_deck.push(spliced_url);
                    });
                    
                    // create the tiles
                    $.each(randomized_url_deck, function(i, val)
                    {
                        $('<div class="tile"><div class="mask"></div><img src="'+this+'" alt="?" /></div>').appendTo("#photo-well");
                    });
                }
            });
        }
    });
}



function displayScores(data)
{
    var list = $('<ul id="scores"></ul>');
    $.each(data, function(key, value)
    {
        item = $('<li><span class="name">'+value.player_name+'</span> <span class="score">'+value.player_score+'</span></li>');
        list.append(item);
    });
    list.appendTo("#scoreboard");
}


function inputIsValid()
{
    var str = $("#player-name").val();
    var str = $.trim(str);
    console.log(str);
    if(str == ""){ return false; }
    else{ return true; }
}



/* ==================================================
On ready
================================================== */

$(document).ready(function()
{
    
    // load first gallery in the list
    var first_gallery = $("#gallery-selector li:first");
    current_gallery = first_gallery.find("a").attr("href");
    
    setupTiles(first_gallery.addClass("selected").find("a").attr("href"));
    $("#tally").text(score);
    
    // display scores
    $.ajax(
    {
        url: "services/get-scores.php",
        type: "GET",
        dataType: "json",
        success: function(data){ displayScores(data); }
    });
    
    // reveal tile image on click
    $("div.tile").live("click", revealImage);
    
    // gallery selector
    $("#gallery-selector li > a")
    .hover(function(){ $(this).css("cursor", "pointer"); })
    .click(function()
    {
        $("#gallery-selector li").removeClass("selected");
        $(this).parent("li").addClass("selected");
        var gallery = this.href;
        current_gallery = gallery;
        setupTiles(gallery);
        return false;
    });
    
    // gallery input form
    $("#custom-gallery").submit(function()
    {
        var gallery_url = $("input#url").val();
        if(gallery_url.indexOf("http://") == -1){ gallery_url = "http://"+gallery_url; }
        if(gallery_url.search(/\/$/) > -1){ gallery_url.replace(/\/+$/, ""); }
        setupTiles(gallery_url);
        current_gallery = gallery_url;
        return false;
    });
    
    // loading gif
    $("#photo-well").ajaxStart(function(){ $(this).addClass("ajaxing"); }).ajaxStop(function(){ $(this).removeClass("ajaxing"); });
    
    // user score submission
    $("#user-scores").submit(function(event)
    {
        event.preventDefault();
        
        if(inputIsValid())
        {
            var game_data = {};
            game_data.player_name = $("#player-name").val();
            game_data.player_score = score;
            game_data.gallery_url = current_gallery;
            
            $.ajax
            ({
                url: "services/user-scores.php",
                type: "POST",
                data: game_data,
                dataType: "json",
                complete: function()
                {
                    $("#player-name").attr("value", "");
                    $("#score-submit").attr("disabled", "disabled");
                    $("#user-scores-entry").css("display", "none");
                    window.location.reload();
                }
            });
        }
    });
    
    // cancel button
    $("#score-cancel").click(function()
    {
        $("#player-name").attr("value", "");
        $("#score-submit").attr("disabled", "disabled");
        $("#user-scores-entry").css("display", "none");        
    });
    
});



























