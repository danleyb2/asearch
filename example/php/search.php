<?php

require_once 'data.php';
function search($key){
	#echo $key['name'];
	$r=strpos($key['name'],$_GET['q']);
	return ($r===0|$r>0);	
}
array_push($data,
	array(
		'name'=>'Brian Nyaundi',
		'time'=>'3 days',
		'location'=>'Nairobi',
		'about'=>'Pretend. You pretend the feelings are there, for the world, for the people around you.')
		);
array_push($data,
	array(
		'name'=>'Denis Otieno',
		'time'=>'2 hrs',
		'location'=>'Mombasa',
		'about'=>'Geek. You shouldn\'t call other pople geeks if you are one.')
	);

if(isset($_GET['q'])){
$arrayName = array();
foreach (array_filter($data,'search') as $dat => $value) {
	array_push($arrayName, $value);
}
ob_clean();
echo json_encode($arrayName);
ob_end_flush();

}
?>