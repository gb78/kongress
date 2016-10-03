<?
//if(empty($_POST['content'])) die("nope");

$tt=explode(' ', microtime());
$fn=$tt[1].'_'.$tt[0].".json";

		$fh=fopen("../../DATA/".$fn,'w');
		fwrite($fh,
			json_encode(
				json_decode(
					$_POST['content']
				)
			)
		);
		fclose($fh);
		
echo time();
?>
