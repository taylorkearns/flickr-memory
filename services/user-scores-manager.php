<?php

require_once 'database-connection.php';

/* -------------------------------------------------------------------------------- */
class UserScoresManager
{
    var $db_connection;
    
    
    
    function __construct()
    {
        if(!($this->db_connection = new DatabaseConnection()))
        {
            echo 'Unable to establish database connection.';
        }
    }
    
    
    
    function create($player_name, $player_score, $gallery_url)
    {
        $player_name = $this->sanitize($player_name);
        $player_score = $this->sanitize($player_score);
        $player_comments = $this->sanitize($player_comments);
        
        $query = 'INSERT INTO user_scores (player_name, player_score, gallery_url, created_at) ';
        $query .= 'VALUES ("'.$player_name.'", "'.$player_score.'", "'.$gallery_url.'", '.time().')';
        
        if(!($result = mysql_query($query)))
        {
            echo 'Unable to update database.';
            exit;
        }
    }
    
    
    
    function getScores()
    {
        $query = 'SELECT player_name, player_score FROM user_scores ORDER BY player_score';
        if(!$result = mysql_query($query))
        {
            echo 'Unable to retrieve scores.';
            exit;
        }
                        
        $player_scores = array();
        while($row = mysql_fetch_assoc($result))
        {
            $player_scores[] = array
            (
                'player_name' => $row['player_name'],
                'player_score' => $row['player_score']
            );
        }
        
        $json = json_encode($player_scores);
        echo $json;
    }
    
    
    
    function sanitize($input)
    {
        return mysql_real_escape_string($input);
    }
    
}
/* -------------------------------------------------------------------------------- */

?>