<?php
 
// Create connection
$con=mysqli_connect("localhost","azzidaco","M@tchF1xing","azzidaco_wp_lf1u");
 
// Check connection
if (mysqli_connect_errno())
{
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
 
// This SQL statement selects ALL from the table 'Breweries'
$sql = "SELECT * FROM CVSA_TEAMS";
 
// Check if there are results
if ($result = mysqli_query($con, $sql))
{
	// If so, then create a results array and a temporary one
	// to hold the data
	$resultArray = array();
	$tempArray = array();
 
	// Loop through each row in the result set
	while($row = $result->fetch_object())
	{
		// Add each row into our results array
		$tempArray = $row;
	    array_push($resultArray, $tempArray);
	}
         $brewslocalservice = array("data"=>$resultArray);

	// Finally, encode the array to JSON and output the results
	echo $json = json_encode($brewslocalservice), "\n";
}
 
// Close connections
mysqli_close($con);
?>