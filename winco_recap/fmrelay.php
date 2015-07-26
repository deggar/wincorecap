<?php
header('Content-type: text/xml');
$postParams = file_get_contents("php://input"); 
$params = $_SERVER['QUERY_STRING'];
$username = "php";
$password = "php";

// $ch = curl_init('http://50.240.31.157/fmi/xml/fmresultset.xml');
$ch = curl_init('http://10.0.101.201/fmi/xml/fmresultset.xml');
curl_setopt ($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt ($ch, CURLOPT_USERPWD, $username . ":" . $password);  
curl_setopt ($ch, CURLOPT_POST, 1);
curl_setopt ($ch, CURLOPT_POSTFIELDS, $params);
//curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$response = curl_exec($ch);
curl_close($ch);
    
$xml = new SimpleXmlElement($response);

// echo $xml->asXML();

// curl_exec ($ch);
// curl_close ($ch);


//$result = curl_exec ($ch);   
//curl_close ($ch);    
//$xml = simplexml_load_string($result);
//echo $xml;

//$xml = new SimpleXMLElement($result);

//echo $xml->asXML();


//$xml = simplexml_load_string($xml_string);
//$json = json_encode($xml);
//$array = json_decode($json,TRUE);

//echo $array;

?>