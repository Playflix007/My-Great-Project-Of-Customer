<?php
// Get the 'id' parameter from the URL
$id = isset($_GET['id']) ? $_GET['id'] : '';

// URL to the .mpd file
$url = "https://m3u.yuvraj49.xyz/tp/Kxxye79fJZ3R/manifest/$id.mpd";

// Create a context with the required headers (User-Agent)
$options = [
    'http' => [
        'header' => "User-Agent: Safari/537.36\r\n"
    ]
];

// Create a stream context with the specified options
$context = stream_context_create($options);

// Fetch the .mpd file content using file_get_contents
$response = @file_get_contents($url, false, $context);

// Check for errors
if ($response === FALSE) {
    echo "Failed to retrieve the .mpd file.";
} else {
    // Set the correct content type and output the .mpd content
    header('Content-Type: application/dash+xml');  // Correct content type for .mpd
    echo $response;
}
