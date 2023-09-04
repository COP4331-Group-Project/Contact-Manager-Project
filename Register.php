<?php
	$inData = getRequestInfo();
	$firstName = $inData["FirstName"];
	$lastName = $inData["LastName"];
	$login = $inData["Login"];
	$password = $inData["Password"];
	echo "Zone2";
	$conn = new mysqli("localhost", "Admin", "Dev123", "COP4331"); 
	echo "Zone3";
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		echo "Zone4";
		$stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)");
		echo "Zone5";
		$stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
		echo "Zone6";
		$stmt->execute();
		echo "Zone7";
		$stmt->close();
		$conn->close();
		echo "Zone8";
		returnWithError("");
		echo "Zone9";
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
