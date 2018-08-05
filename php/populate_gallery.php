<?php
$pid = $_POST['project_id'];

$dir = '../img/' . $pid;

$files = scandir($dir);
$output = [];

foreach($files as $file) {
    if($file != '.' && $file != '..') {
        array_push($output, $file);
    }
}

$returnJSON = json_encode($output);

echo $returnJSON;
?>