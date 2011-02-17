<?php

/* -------------------------------------------------------------------------------- */
class DatabaseConnection
{
    var $host;
    var $database;
    var $username;
    var $password;
    var $conn;
    
    function DatabaseConnection()
    {
        $this->host = '127.0.0.1';
        $this->database = 'flickr-memory';
        $this->username = 'flickruser';
        $this->password = 'flickruser';
        
        if(!($this->conn = mysql_connect($this->host, $this->username, $this->password)))
        {
            echo 'Unable to estabish connection with database.';
            exit();
        }
        else if(!mysql_select_db($this->database))
        {
            echo 'Unable to select database.';
            exit();
        }
    }
}
/* -------------------------------------------------------------------------------- */

?>