<?php
$name = htmlspecialchars($_POST['full_name']);
$email = htmlspecialchars($_POST['email']);
$tel = htmlspecialchars($_POST['tel']);

$data = [
    'REMOTE_ADDR' => isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['REMOTE_ADDR'] . "/" . $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'],
    'HTTP_REFERER' => isset($_COOKIE['referrer']) ? urldecode($_COOKIE['referrer']) : null,
    'QUERY_STRING' => isset($_COOKIE['query_string']) ? str_replace('?', '', urldecode($_COOKIE['query_string'])) : null,
    'form' => 'landingufw',
    'name' => $name,
    'phone' => $tel,
    'email' => $email,
];

$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => 'http://crm.tusur.ru/index.php?r=api/order',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $data,
));

$response = curl_exec($curl);
curl_close($curl);
$response = json_decode($response);

if ($response && isset($response->result) && $response->result === 'ok') {
    echo 'Спасибо! Ваша заявка принята!';
}
