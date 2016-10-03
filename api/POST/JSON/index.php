<?
if(empty($_POST['id'])) die("nope. ");
if(empty($_POST['content'])) die("not yet. ");

		$fn=fopen("../../GET/JSON/".$_POST['id'].".json",'w');
		fwrite($fn,$_POST['content']);
		fclose($fn);

echo "ok";

?>
