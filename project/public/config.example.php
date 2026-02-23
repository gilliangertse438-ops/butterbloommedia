<?php
/**
 * Contact Form Configuration
 *
 * SETUP INSTRUCTIONS:
 * 1. Rename this file to config.php
 * 2. Fill in your SMTP settings below
 * 3. Update email addresses
 * 4. Never commit config.php to version control
 */

// SMTP Settings
// Get these from your Afrihost cPanel or email hosting provider
define('SMTP_HOST', 'mail.yourdomain.co.za');      // e.g., mail.mrbutterbloom.co.za or smtp.afrihost.com
define('SMTP_PORT', 587);                           // Usually 587 for TLS or 465 for SSL
define('SMTP_USERNAME', 'noreply@yourdomain.co.za'); // Your email address
define('SMTP_PASSWORD', 'your-email-password');     // Your email password
define('SMTP_ENCRYPTION', 'tls');                   // 'tls' or 'ssl'

// Email Addresses
define('FROM_EMAIL', 'noreply@yourdomain.co.za');   // Email that sends the form (must match SMTP_USERNAME)
define('FROM_NAME', 'Butterbloom Media Website');   // Display name for sender
define('TO_EMAIL', 'info@mrbutterbloom.co.za');     // Where to send the form submissions

/**
 * Common Afrihost SMTP Settings:
 *
 * For Afrihost Shared Hosting:
 * - SMTP_HOST: mail.yourdomain.co.za (replace yourdomain.co.za with your actual domain)
 * - SMTP_PORT: 587
 * - SMTP_ENCRYPTION: tls
 * - SMTP_USERNAME: Full email address (e.g., noreply@mrbutterbloom.co.za)
 * - SMTP_PASSWORD: The password for that email account
 *
 * Note: The FROM_EMAIL must be an actual email address that exists on your domain
 * and must match SMTP_USERNAME for authentication to work.
 */
