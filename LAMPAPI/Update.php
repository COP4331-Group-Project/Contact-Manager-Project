<?php
	$inData = getRequestInfo();
    $id = $inData["ID"];
	$firstName = $inData["FirstName"];
    $lastName = $inData["LastName"];
    $phone = $inData["Phone"];
    $email = $inData["Email"];

	$conn = new mysqli("localhost", "Admin", "Dev123", "COP4331"); 

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        if (!empty($firstName)) {
		    $stmt = $conn->prepare("UPDATE Contacts SET FirstName=? WHERE ID=?");
		    $stmt->bind_param("ss", $firstName, $id);
            $stmt->execute();
		    $stmt->close();
        }
        if (!empty($lastName)) {
		    $stmt = $conn->prepare("UPDATE Contacts SET LastName=? WHERE ID=?");
		    $stmt->bind_param("ss", $lastName, $id);
            $stmt->execute();
		    $stmt->close();
        }
        if (!empty($phone)) {
		    $stmt = $conn->prepare("UPDATE Contacts SET Phone=? WHERE ID=?");
		    $stmt->bind_param("ss", $phone, $id);
            $stmt->execute();
		    $stmt->close();
        }
        if (!empty($email)) {
		    $stmt = $conn->prepare("UPDATE Contacts SET Email=? WHERE ID=?");
		    $stmt->bind_param("ss", $email, $id);
            $stmt->execute();
		    $stmt->close();
        }

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
