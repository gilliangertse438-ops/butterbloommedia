# Contact Form Backend - Production Ready

## Overview

This contact form backend is production-ready and uses PHPMailer for reliable SMTP email delivery. It includes security features, rate limiting, honeypot protection, and comprehensive error logging.

## Files Created/Updated

### 1. `/public/contact.php` (UPDATED)
Production-ready PHP endpoint with:
- PHPMailer integration for SMTP email sending
- Rate limiting (5 submissions per hour per IP)
- Honeypot spam protection ("website" field)
- Field validation (name, email, message required)
- Email format validation
- HTML + plain text email templates
- Security headers (CORS, XSS protection, etc.)
- Comprehensive error logging to `/public/logs/contact-form.log`
- Health check endpoint: `GET /contact.php?health`
- Returns `ok=1` on success, `ok=0&error=...` on failure

### 2. `/public/config.example.php` (NEW)
Configuration template with placeholders for:
- `SMTP_HOST` - Your mail server (e.g., mail.mrbutterbloom.co.za)
- `SMTP_PORT` - Usually 587 for TLS, 465 for SSL
- `SMTP_USERNAME` - Your email address
- `SMTP_PASSWORD` - Your email password
- `SMTP_ENCRYPTION` - 'tls' or 'ssl'
- `FROM_EMAIL` - Sender email (must match SMTP_USERNAME)
- `FROM_NAME` - Display name for sender
- `TO_EMAIL` - Where to send submissions (info@mrbutterbloom.co.za)

### 3. `/public/.htaccess` (NEW)
Security rules to protect:
- config.php from web access
- Log files (.log, .json)
- PHPMailer source files
- Allows contact.php to be accessed

### 4. `/DEPLOYMENT-INSTRUCTIONS.md` (NEW)
Complete deployment guide including:
- PHPMailer installation (Composer or manual)
- Afrihost-specific SMTP configuration
- File permissions setup
- Security best practices
- Troubleshooting guide
- Testing procedures

### 5. `/src/components/Contact.tsx` (UPDATED)
Frontend improvements:
- Enhanced error handling with backend error parsing
- Primary Interest field now included in email message
- Already has: honeypot, rate limiting UI, loading states, form validation

## Email Template

The system sends beautiful HTML emails with:
- Red-to-blue gradient header
- Structured table layout for contact details
- Highlighted message section with brand colors
- Metadata footer (timestamp, page URL, IP address)
- Mobile-responsive design
- Plain text fallback for email clients that don't support HTML

## Features

### Security
- Honeypot field to catch bots
- Rate limiting (5 submissions/hour per IP)
- Input sanitization (XSS prevention)
- Email validation
- CORS headers for same-domain requests
- Protected config files via .htaccess
- Security headers (X-Frame-Options, X-XSS-Protection, etc.)

### Email Delivery
- PHPMailer with SMTP authentication
- HTML + plain text formats
- Reply-To header set to submitter's email
- Branded email templates
- Error handling with fallback messages
- UTF-8 character encoding support

### Logging & Monitoring
- Success/failure logging to `/logs/contact-form.log`
- Honeypot trigger logging
- Rate limit violation logging
- PHP error logging
- Includes timestamp, IP, and submission details

### User Experience
- Clear success/error messages
- Form field validation
- Loading states during submission
- Form reset on success
- Rate limit user feedback

## Deployment Checklist

- [ ] Download/install PHPMailer (see DEPLOYMENT-INSTRUCTIONS.md)
- [ ] Rename `config.example.php` to `config.php`
- [ ] Configure SMTP settings in `config.php`
- [ ] Upload files to Afrihost public_html
- [ ] Set permissions: 644 for PHP files, 755 for logs directory
- [ ] Upload `.htaccess` for security
- [ ] Test form submission
- [ ] Verify email delivery
- [ ] Check logs for errors
- [ ] Delete any test files (e.g., test-email.php)

## Folder Structure on Afrihost

```
public_html/
├── contact.php              # Main endpoint
├── config.php              # Your SMTP settings (rename from config.example.php)
├── .htaccess              # Security rules
├── PHPMailer/             # PHPMailer library
│   ├── PHPMailer.php
│   ├── SMTP.php
│   └── Exception.php
└── logs/                  # Auto-created, needs 755 permissions
    ├── contact-form.log   # Success/failure log
    └── rate-limit.json    # Rate limiting data
```

## API Response Format

**Success:**
```
ok=1
```
HTTP Status: 200

**Failure:**
```
ok=0&error=Error message here
```
HTTP Status: 400 (validation), 429 (rate limit), 500 (server error)

## Testing the Endpoint

1. **Health Check:**
   ```bash
   curl https://mrbutterbloom.co.za/contact.php?health
   # Should return: ok=1
   ```

2. **Test Submission:**
   ```bash
   curl -X POST https://mrbutterbloom.co.za/contact.php \
     -d "name=John Doe" \
     -d "email=john@example.com" \
     -d "message=Test message" \
     -d "pageUrl=https://mrbutterbloom.co.za" \
     -d "timestamp=$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
     -d "website="
   # Should return: ok=1
   ```

3. **Test Honeypot:**
   ```bash
   curl -X POST https://mrbutterbloom.co.za/contact.php \
     -d "name=Bot" \
     -d "email=bot@spam.com" \
     -d "message=Spam" \
     -d "website=http://spam.com"
   # Should return: ok=1 (but no email sent)
   ```

## Common Issues & Solutions

### Email not sending
1. Check SMTP credentials in `config.php`
2. Verify FROM_EMAIL matches SMTP_USERNAME
3. Try port 465 with SSL if 587/TLS fails
4. Check logs: `tail -f public_html/logs/contact-form.log`

### "Server configuration error"
- `config.php` doesn't exist or isn't readable
- Rename `config.example.php` to `config.php`
- Check file permissions (should be 644)

### Rate limit triggered
- Delete `logs/rate-limit.json` to reset
- Adjust MAX_SUBMISSIONS in contact.php if needed

### PHPMailer not found
- Install via Composer or download manually
- Ensure files are in `/public_html/PHPMailer/`
- Check file paths in contact.php

## Security Notes

1. **NEVER** commit `config.php` to version control
2. Keep `.htaccess` protection in place
3. Monitor logs regularly for suspicious activity
4. Consider adding CAPTCHA if spam becomes an issue
5. The honeypot field catches most bots silently

## Support

For detailed deployment instructions and troubleshooting, see:
- `DEPLOYMENT-INSTRUCTIONS.md` - Complete deployment guide
- `public/logs/contact-form.log` - Error logs
- Afrihost support: https://support.afrihost.com
