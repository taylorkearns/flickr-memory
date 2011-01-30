/* ==================================================
Global variables
================================================== */
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
            score ++;
            $("#tally").text(score);
        }
        
        images_showing = 0;
    }    
    
    return false;
}



/* ==================================================
On ready
================================================== */

$(document).ready(function()
{
    
    /* ==================================================
    Flickr / ajax 
    ================================================== */
    
    // get the gallery ID
    $.ajax
    ({
        url: "http://api.flickr.com/services/rest/?method=flickr.urls.lookupGallery&api_key=8997c537cd1ff627d69d2c70b4ef9246&url=http://www.flickr.com/photos/taylorkearns/galleries/72157625863370830&format=json&jsoncallback=?",
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
    
    
    
    /* ==================================================
    Page functionality
    ================================================== */
    
    $("#tally").text(score);
    
    $("div.tile").live("click", revealImage);
        
});



























