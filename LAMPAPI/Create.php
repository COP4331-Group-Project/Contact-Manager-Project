<?php
    session_start(); // Start a PHP session (if not already started)
    $inData = getRequestInfo();

    $firstName = $inData["FirstName"];
    $lastName = $inData["LastName"];
    $phone = $inData["Phone"];
    $email = $inData["Email"];

    // Check if the user is authenticated and the UserID is available in the session
    if (isset($_SESSION["UserID"])) 
    {
        $loggedInUserID = $_SESSION["UserID"];
    } 
    else
    {
        // Handle the case when the user is not authenticated
        returnWithError("User not authenticated.");
        exit(); // Stop execution if the user is not authenticated
    }

    $conn = new mysqli("localhost", "Admin", "Dev123", "COP4331"); 

    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else
    {
        $stmt = $conn->prepare("INSERT INTO Contacts (FirstName, LastName, Phone, Email, UserID) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssi", $firstName, $lastName, $phone, $email, $loggedInUserID);
   
        if ($stmt->execute()) 
        {
            // Contact record inserted successfully
            $stmt->close();
            $conn->close();
            returnWithError("");
        } 
        else 
        {
            // Handle any errors that occur during the insertion
            returnWithError("Error inserting contact.");
        }
    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }
    
?>
