<?php
/**
 * Contact Form Handler
 * Processes contact form submissions and sends emails via SMTP using PHPMailer
 */

// Enable error reporting for debugging (disable in production if needed)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Health check endpoint
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['health'])) {
    http_response_code(200);
    echo 'ok=1';
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'ok=0&error=Method not allowed';
    exit;
}

// Load configuration
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    error_log('Contact form error: config.php not found');
    http_response_code(500);
    echo 'ok=0&error=Server configuration error';
    exit;
}
require_once $configFile;

// Load PHPMailer
// Check if using Composer or manual installation
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
} elseif (file_exists(__DIR__ . '/PHPMailer/PHPMailer.php')) {
    require_once __DIR__ . '/PHPMailer/PHPMailer.php';
    require_once __DIR__ . '/PHPMailer/SMTP.php';
    require_once __DIR__ . '/PHPMailer/Exception.php';
} else {
    error_log('Contact form error: PHPMailer not found');
    http_response_code(500);
    echo 'ok=0&error=Server configuration error';
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Initialize log directory
$logDir = __DIR__ . '/logs';
if (!file_exists($logDir)) {
    @mkdir($logDir, 0755, true);
}
$logFile = $logDir . '/contact-form.log';

/**
 * Log message to file
 */
function logMessage($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[{$timestamp}] {$message}\n";
    @file_put_contents($logFile, $logEntry, FILE_APPEND);
}

/**
 * Get client IP address
 */
function getClientIP() {
    $ipKeys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
    foreach ($ipKeys as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = $_SERVER[$key];
            // Handle comma-separated IPs (X-Forwarded-For)
            if (strpos($ip, ',') !== false) {
                $ips = explode(',', $ip);
                $ip = trim($ips[0]);
            }
            return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : $_SERVER['REMOTE_ADDR'];
        }
    }
    return 'UNKNOWN';
}

/**
 * Check rate limit (5 submissions per hour per IP)
 */
function checkRateLimit($ip) {
    global $logDir;
    $rateFile = $logDir . '/rate-limit.json';
    $maxSubmissions = 5;
    $timeWindow = 3600; // 1 hour in seconds

    // Load existing rate data
    $rateData = [];
    if (file_exists($rateFile)) {
        $content = @file_get_contents($rateFile);
        if ($content) {
            $rateData = json_decode($content, true) ?: [];
        }
    }

    // Clean old entries
    $currentTime = time();
    foreach ($rateData as $ipKey => $timestamps) {
        $rateData[$ipKey] = array_filter($timestamps, function($ts) use ($currentTime, $timeWindow) {
            return ($currentTime - $ts) < $timeWindow;
        });
        if (empty($rateData[$ipKey])) {
            unset($rateData[$ipKey]);
        }
    }

    // Check current IP
    if (!isset($rateData[$ip])) {
        $rateData[$ip] = [];
    }

    if (count($rateData[$ip]) >= $maxSubmissions) {
        return false; // Rate limit exceeded
    }

    // Add current timestamp
    $rateData[$ip][] = $currentTime;

    // Save rate data
    @file_put_contents($rateFile, json_encode($rateData));

    return true;
}

/**
 * Validate email format
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Sanitize input
 */
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

// Get POST data
$name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
$phone = isset($_POST['phone']) ? sanitizeInput($_POST['phone']) : '';
$company = isset($_POST['company']) ? sanitizeInput($_POST['company']) : '';
$message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';
$pageUrl = isset($_POST['pageUrl']) ? sanitizeInput($_POST['pageUrl']) : '';
$timestamp = isset($_POST['timestamp']) ? sanitizeInput($_POST['timestamp']) : '';
$honeypot = isset($_POST['website']) ? $_POST['website'] : '';

// Get client IP
$clientIP = getClientIP();

// Honeypot check - reject if filled (return success to hide it's a honeypot)
if (!empty($honeypot)) {
    logMessage("Honeypot triggered from IP: {$clientIP}");
    http_response_code(200);
    echo 'ok=1';
    exit;
}

// Validate required fields
if (empty($name)) {
    http_response_code(400);
    echo 'ok=0&error=Name is required';
    exit;
}

if (empty($email)) {
    http_response_code(400);
    echo 'ok=0&error=Email is required';
    exit;
}

if (!isValidEmail($email)) {
    http_response_code(400);
    echo 'ok=0&error=Invalid email address';
    exit;
}

if (empty($message)) {
    http_response_code(400);
    echo 'ok=0&error=Message is required';
    exit;
}

// Check rate limit
if (!checkRateLimit($clientIP)) {
    logMessage("Rate limit exceeded for IP: {$clientIP}");
    http_response_code(429);
    echo 'ok=0&error=Too many submissions. Please try again later.';
    exit;
}

// Prepare email body (plain text)
$emailBody = "NEW WEBSITE ENQUIRY\n";
$emailBody .= str_repeat('=', 60) . "\n\n";
$emailBody .= "Name: {$name}\n";
$emailBody .= "Email: {$email}\n";
if (!empty($phone)) {
    $emailBody .= "Phone: {$phone}\n";
}
if (!empty($company)) {
    $emailBody .= "Company: {$company}\n";
}
$emailBody .= "\nMessage:\n{$message}\n\n";
$emailBody .= str_repeat('-', 60) . "\n";
$emailBody .= "Submitted: {$timestamp}\n";
$emailBody .= "Page URL: {$pageUrl}\n";
$emailBody .= "IP Address: {$clientIP}\n";
$emailBody .= str_repeat('=', 60) . "\n";

// Prepare HTML email body
$emailBodyHtml = "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;'>
    <div style='background: linear-gradient(135deg, #dc2626 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;'>
        <h1 style='color: white; margin: 0; font-size: 24px;'>New Website Enquiry</h1>
    </div>
    <div style='background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;'>
        <table style='width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;'>
            <tr style='background: #f3f4f6;'>
                <td style='padding: 12px 20px; font-weight: bold; border-bottom: 1px solid #e5e7eb;'>Name</td>
                <td style='padding: 12px 20px; border-bottom: 1px solid #e5e7eb;'>{$name}</td>
            </tr>
            <tr>
                <td style='padding: 12px 20px; font-weight: bold; border-bottom: 1px solid #e5e7eb;'>Email</td>
                <td style='padding: 12px 20px; border-bottom: 1px solid #e5e7eb;'><a href='mailto:{$email}' style='color: #dc2626; text-decoration: none;'>{$email}</a></td>
            </tr>";

if (!empty($phone)) {
    $emailBodyHtml .= "
            <tr style='background: #f3f4f6;'>
                <td style='padding: 12px 20px; font-weight: bold; border-bottom: 1px solid #e5e7eb;'>Phone</td>
                <td style='padding: 12px 20px; border-bottom: 1px solid #e5e7eb;'>{$phone}</td>
            </tr>";
}

if (!empty($company)) {
    $emailBodyHtml .= "
            <tr>
                <td style='padding: 12px 20px; font-weight: bold; border-bottom: 1px solid #e5e7eb;'>Company</td>
                <td style='padding: 12px 20px; border-bottom: 1px solid #e5e7eb;'>{$company}</td>
            </tr>";
}

$emailBodyHtml .= "
        </table>

        <div style='margin-top: 25px;'>
            <h3 style='color: #dc2626; margin-bottom: 15px;'>Message:</h3>
            <div style='background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; white-space: pre-wrap;'>{$message}</div>
        </div>

        <div style='margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;'>
            <p style='color: #6b7280; font-size: 13px; margin: 5px 0;'><strong>Submitted:</strong> {$timestamp}</p>
            <p style='color: #6b7280; font-size: 13px; margin: 5px 0;'><strong>Page URL:</strong> <a href='{$pageUrl}' style='color: #3b82f6;'>{$pageUrl}</a></p>
            <p style='color: #6b7280; font-size: 13px; margin: 5px 0;'><strong>IP Address:</strong> {$clientIP}</p>
        </div>

        <div style='margin-top: 30px; text-align: center; color: #9ca3af; font-size: 12px;'>
            <p>Butterbloom Media — Growth Systems, Not Marketing Chaos</p>
        </div>
    </div>
</body>
</html>";

// Send email using PHPMailer
try {
    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USERNAME;
    $mail->Password = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_ENCRYPTION;
    $mail->Port = SMTP_PORT;
    $mail->CharSet = 'UTF-8';

    // Recipients
    $mail->setFrom(FROM_EMAIL, FROM_NAME);
    $mail->addAddress(TO_EMAIL);
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(true);
    $mail->Subject = "New Website Enquiry: {$name}";
    $mail->Body = $emailBodyHtml;
    $mail->AltBody = $emailBody;

    // Send email
    $mail->send();

    logMessage("Email sent successfully from {$name} ({$email}) - IP: {$clientIP}");
    http_response_code(200);
    echo 'ok=1';

} catch (Exception $e) {
    logMessage("Email send failed: {$mail->ErrorInfo} - From: {$name} ({$email}) - IP: {$clientIP}");
    error_log("PHPMailer Error: {$mail->ErrorInfo}");
    http_response_code(500);
    echo 'ok=0&error=Failed to send message. Please try again or contact us directly.';
}
