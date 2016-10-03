<?php

$dir = "../DATA/";
$dh  = opendir($dir);
while (false !== ($filename = readdir($dh)))
{
 if(($filename!=='.') AND ($filename!=='..'))
 {
  $key=fileatime($dir.$filename);
  $files[$filename] = $key;
 }
}

if (count($files)>0)
{
 rsort ($files);

foreach($files as $k=>$v)
	echo "<div class=info><a href=$dir{$k}>$k</a>".(time()-$v)." segundos -> $v</div><hr>";

}else{if(!$silent)echo "nothing here";}
?>
