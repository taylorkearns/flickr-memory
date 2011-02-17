<?php

require_once 'user-scores-manager.php';



$player_name = '';
if($_POST['player_name']){ $player_name = $_POST['player_name']; }

$player_score = $_POST['player_score'];

$gallery_url = $_POST['gallery_url'];



$user_scores_manager = new UserScoresManager();

$response = $user_scores_manager->create($player_name, $player_score, $gallery_url);

echo $response;

?>