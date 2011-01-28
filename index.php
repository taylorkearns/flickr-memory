<!DOCTYPE HTML>  
<html>
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="author" content="">
    
    <title></title>
    
    <link rel="shortcut icon" href="/favicon.ico">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js"></script>  
</head>

<body>

<section id="photo-well">
    
</section>

<!--
Scripts
-->
<script>

$(document).ready(function()
{
    // get the gallery ID
    $.ajax
    ({
        url: "http://api.flickr.com/services/rest/?method=flickr.urls.lookupGallery&api_key=8997c537cd1ff627d69d2c70b4ef9246&url=http://www.flickr.com/photos/taylorkearns/galleries/72157625863370830&format=json&jsoncallback=?",
        dataType: "json",
        success: function(data)
        {
            console.log(data.gallery);
            
            var gallery_id = data.gallery.id;
            
            // get the photos from the gallery using the ID from above
            $.ajax
            ({
                url: "http://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=8997c537cd1ff627d69d2c70b4ef9246&gallery_id="+gallery_id+"&format=json&jsoncallback=?",    
                dataType: "json",
                success: function(data)
                {
                    console.log(data.photos);
                    
                    var deck = [];
                    var photos = data.photos;
                    
                    $.each(photos, function(key, value)
                    {
                        console.log(key+": "+value);   
                    });
                }
            });
        }
    });
});

</script>

</body>
</html>