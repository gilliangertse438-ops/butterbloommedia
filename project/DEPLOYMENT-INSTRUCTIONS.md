# Contact Form Deployment Instructions for Afrihost

## Prerequisites

1. Active Afrihost hosting account with cPanel access
2. Domain email account created (e.g., noreply@mrbutterbloom.co.za)
3. FTP/SFTP access or cPanel File Manager access

## Step 1: Install PHPMailer

PHPMailer is required for reliable SMTP email sending. You have two options:

### Option A: Using Composer (Recommended)

If you have SSH access to your Afrihost server:

```bash
cd public_html
composer require phpmailer/phpmailer
```

### Option B: Manual Installation

1. Download PHPMailer from: https://github.com/PHPMailer/PHPMailer/releases
2. Extract the ZIP file
3. Create folder structure: `public_html/PHPMailer/`
4. Upload these files to `public_html/PHPMailer/`:
   - `PHPMailer.php`
   - `SMTP.php`
   - `Exception.php`

## Step 2: Configure Email Settings

1. **Rename config file:**
   - Rename `config.example.php` to `config.php`

2. **Get SMTP settings from Afrihost:**
   - Log into cPanel
   - Go to "Email Accounts"
   - Create email: `noreply@mrbutterbloom.co.za` (if not exists)
   - Note down the SMTP settings (usually shown in "Configure Email Client")

3. **Update config.php with your settings:**
   ```php
   define('SMTP_HOST', 'mail.mrbutterbloom.co.za');
   define('SMTP_PORT', 587);
   define('SMTP_USERNAME', 'noreply@mrbutterbloom.co.za');
   define('SMTP_PASSWORD', 'your-actual-password');
   define('SMTP_ENCRYPTION', 'tls');
   define('FROM_EMAIL', 'noreply@mrbutterbloom.co.za');
   define('FROM_NAME', 'Butterbloom Media Website');
   define('TO_EMAIL', 'info@mrbutterbloom.co.za');
   ```

## Step 3: Upload Files

Upload these files to your Afrihost `public_html` directory:

```
public_html/
├── contact.php
├── config.php (renamed from config.example.php)
├── PHPMailer/
│   ├── PHPMailer.php
│   ├── SMTP.php
│   └── Exception.php
└── logs/ (will be created automatically)
```

## Step 4: Set Permissions

Using cPanel File Manager or FTP:

1. Set `contact.php` to 644 (readable/executable)
2. Set `config.php` to 644 (readable but protected by .htaccess)
3. Create `logs` directory and set to 755 (writable)

## Step 5: Security (Optional but Recommended)

Create a `.htaccess` file in `public_html/` to protect sensitive files:

```apache
# Protect config files
<Files "config.php">
    Order Allow,Deny
    Deny from all
</Files>

# Protect log files
<FilesMatch "\.(log|json)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>
```

## Step 6: Test the Form

1. Visit your website's contact form
2. Fill out the form with test data
3. Submit and verify:
   - Success message appears
   - Email arrives at info@mrbutterbloom.co.za
   - Check `logs/contact-form.log` for confirmation

## Troubleshooting

### Email not sending?

1. **Check logs:**
   - Look in `public_html/logs/contact-form.log`
   - Check cPanel error logs

2. **Common issues:**
   - **Authentication failed:** Verify SMTP_USERNAME and SMTP_PASSWORD
   - **Connection timeout:** Try changing SMTP_PORT to 465 and SMTP_ENCRYPTION to 'ssl'
   - **FROM_EMAIL mismatch:** Ensure FROM_EMAIL matches SMTP_USERNAME

3. **Test SMTP settings:**
   Create a test file `test-email.php`:
   ```php
   <?php
   require 'config.php';
   require 'PHPMailer/PHPMailer.php';
   require 'PHPMailer/SMTP.php';
   require 'PHPMailer/Exception.php';

   use PHPMailer\PHPMailer\PHPMailer;

   $mail = new PHPMailer(true);
   $mail->isSMTP();
   $mail->Host = SMTP_HOST;
   $mail->SMTPAuth = true;
   $mail->Username = SMTP_USERNAME;
   $mail->Password = SMTP_PASSWORD;
   $mail->SMTPSecure = SMTP_ENCRYPTION;
   $mail->Port = SMTP_PORT;
   $mail->SMTPDebug = 2; // Enable verbose debug output

   $mail->setFrom(FROM_EMAIL, FROM_NAME);
   $mail->addAddress(TO_EMAIL);
   $mail->Subject = 'Test Email';
   $mail->Body = 'This is a test email';

   if ($mail->send()) {
       echo 'Email sent successfully!';
   } else {
       echo 'Error: ' . $mail->ErrorInfo;
   }
   ```

   Visit: `https://mrbutterbloom.co.za/test-email.php`

   **IMPORTANT:** Delete `test-email.php` after testing!

### Rate limiting issues?

- Rate limit data stored in `logs/rate-limit.json`
- Delete this file to reset all rate limits
- Default: 5 submissions per IP per hour

### Form shows "Server configuration error"?

- `config.php` file is missing or not readable
- Check file permissions (should be 644)
- Verify file was renamed from `config.example.php`

## Afrihost-Specific Notes

1. **SMTP Host format:** Usually `mail.yourdomain.co.za`
2. **Port:** Most Afrihost accounts use 587 with TLS
3. **Email authentication:** Must use a real email address that exists on your domain
4. **PHP version:** Ensure PHP 7.4+ is active in cPanel (Select PHP Version)

## Support

If you continue having issues:
1. Check Afrihost documentation: https://support.afrihost.com
2. Contact Afrihost support for SMTP settings confirmation
3. Review `public_html/logs/contact-form.log` for detailed error messages

## Security Reminders

- Never commit `config.php` to version control
- Keep `.htaccess` protection in place
- Regularly monitor `logs/contact-form.log` for suspicious activity
- Consider adding CAPTCHA if spam becomes an issue
