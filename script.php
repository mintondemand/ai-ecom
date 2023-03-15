<?php
$api_key = '1d0efc1d230df747a31e4455757913d4a39d43e5';
$url = 'https://sdk.photoroom.com/v1/segment';

$imageFile = $_FILES['productImage']['tmp_name'];

$data = array(
  'image_file' => new CURLFile($imageFile),
  'format' => '',
  'channels' => '',
  'bg_color' => '',
  'size' => '',
  'crop' => '',
);

$options = array(
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => $data,
  CURLOPT_HTTPHEADER => array(
    'Content-Type: multipart/form-data',
    "x-api-key: $api_key",
  ),
);

$ch = curl_init();
curl_setopt_array($ch, $options);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
  $data = json_decode($response, true);
  $imageUrl = $data['output']['image']['url'];
  echo json_encode(array('imageUrl' => $imageUrl));
} else {
  header('HTTP/1.1 500 Internal Server Error');
}
?>
