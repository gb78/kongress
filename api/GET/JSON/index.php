<?
if(empty($_GET['id'])) die('no!');

$fn=$_GET['id'].".json";
if(file_exists($fn))
	echo
	json_encode(
		json_decode(
		file_get_contents($fn)
		)
	)
	;


?>
