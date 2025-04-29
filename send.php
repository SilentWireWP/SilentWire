<?php
// send.php

// — BASIC CONFIGURATION —
$to      = 'info@wpwaybooks.de';
$subject = 'Kontaktformular: Neue Nachricht';

// — HELPER: SAFELY GET POST VALUE —
function get_post($key) {
    return isset($_POST[$key])
         ? trim(htmlspecialchars($_POST[$key], ENT_QUOTES, 'UTF-8'))
         : '';
}

// — COLLECT AND VALIDATE —
$name    = get_post('name');
$email   = get_post('email');
$message = get_post('message');

$errors = [];
if (strlen($name) < 2) {
    $errors[] = 'Bitte gib deinen Namen an.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Bitte gib eine gültige E-Mail an.';
}
if (strlen($message) < 5) {
    $errors[] = 'Bitte gib eine Nachricht ein.';
}

if (!empty($errors)) {
    $err = urlencode(implode(' | ', $errors));
    header("Location: index.html?error={$err}#contactModal");
    exit;
}

// — BUILD MAIL BODY —
$body  = "Neue Nachricht über das Kontaktformular:\n\n";
$body .= "Name:    {$name}\n";
$body .= "E-Mail:  {$email}\n\n";
$body .= "Nachricht:\n{$message}\n";

// — HEADERS —
$headers  = "From: {$name} <{$email}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// — SEND MAIL —
if (mail($to, $subject, $body, $headers)) {
    header('Location: index.html?sent=1');
} else {
    header('Location: index.html?error=' . urlencode('Mailversand fehlgeschlagen.'));
}
exit;
?>