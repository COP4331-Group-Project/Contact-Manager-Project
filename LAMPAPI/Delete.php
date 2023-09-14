<?php
	$inData = getRequestInfo();
	$id = $inData["ID"];

	$conn = new mysqli("localhost", "Admin", "Dev123", "COP4331"); 

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = "DELETE FROM Contacts WHERE ID=$id";
		if(mysqli_query($conn, $stmt)){
			echo "Contact number $id has been deleted.";
		} 
		else{
			returnWithError("Contact could not be deleted.");
		}

		#$stmt->execute();
		#$stmt->close();
		$conn->close();
		returnWithError("");
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
