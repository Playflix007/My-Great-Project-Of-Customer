<?php
$serverAddress = $_SERVER['HTTP_HOST'] ?? 'default.server.address';

// The original M3U playlist URL
$playlist_url = "https://$serverAddress/playkodime.m3u";

// Fetch the playlist content
$playlist_content = file_get_contents($playlist_url);

if ($playlist_content === false) {
    die('Error fetching playlist.');
}

// Replace URLs in the playlist for both key and manifest
$modified_content = str_replace(
    "#KODIPROP:inputstream.adaptive.drm_legacy=org.w3.clearkey|http://localhost/key?id=",
    "#KODIPROP:inputstream.adaptive.drm_legacy=org.w3.clearkey|https://$serverAddress/key?id=",
    $playlist_content
);

$modified_content = str_replace(
    "http://localhost/mpd?id=",
    "https://$serverAddress/mpd?id=",
    $modified_content
);

// Set appropriate headers for M3U playlist
header('Content-Type: audio/mpegurl');
header('Content-Disposition: attachment; filename="kodi.m3u"');

// Output the modified playlist
echo $modified_content;
?>
