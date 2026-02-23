# Contact Form Setup Guide

## Overview
The contact form has been configured to send emails to **info@mrbutterbloom.co.za** using Supabase Edge Functions and Resend email service.

## What Was Changed

### 1. Created Supabase Edge Function
**File:** `supabase/functions/send-contact-email/index.ts`

Features:
- Validates form inputs (name, email, message required)
- Honeypot spam protection (hidden "website" field)
- Rate limiting (5 requests per minute per IP)
- Sends professionally formatted HTML emails
- Reply-to set to user's email address
- Includes all form data, page URL, and timestamp

### 2. Updated Contact Form Component
**File:** `src/components/Contact.tsx`

Features:
- Real-time form submission to Edge Function
- Loading states with spinner animation
- Error handling with user-friendly messages
- Success confirmation screen
- Form reset after successful submission
- Honeypot field for spam protection
- All fields disabled during submission

### 3. Added Environment Configuration
**File:** `.env.example`

Documents required environment variables for both frontend and backend.

## Required Setup Steps

### Step 1: Get Resend API Key

1. Go to [Resend.com](https://resend.com) and create an account
2. Verify your domain OR use the testing domain (onboarding@resend.dev) for development
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Give it a name (e.g., "Butterbloom Contact Form")
6. Copy the API key (starts with `re_`)

### Step 2: Configure Supabase Edge Function Secret

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Project Settings** > **Edge Functions** > **Secrets**
4. Click **Add new secret**
5. Name: `RESEND_API_KEY`
6. Value: Paste your Resend API key
7. Click **Save**

### Step 3: Verify Domain (For Production)

For production use, you need to verify your domain in Resend:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `mrbutterbloom.co.za`
4. Follow the DNS configuration instructions
5. Add the required DNS records to your domain
6. Wait for verification (usually takes a few minutes)

Once verified, update the Edge Function to use your domain:

```typescript
from: "Butterbloom Contact Form <noreply@mrbutterbloom.co.za>",
```

## Testing the Form

### Test Checklist

1. **Basic Submission**
   - Fill out all required fields
   - Submit the form
   - Should see "Sending..." with spinner
   - Should receive success message
   - Form should reset

2. **Email Delivery**
   - Check info@mrbutterbloom.co.za inbox
   - Email subject: "New Butterbloom Lead: [Name] - [Service]"
   - Reply-to should be the user's email
   - All form data should be present

3. **Error Handling**
   - Try submitting without required fields (browser validation)
   - Try submitting with invalid email (browser validation)
   - If API fails, should see error message

4. **Spam Protection**
   - Honeypot field is hidden and should not be filled by humans
   - Bots that auto-fill all fields will trigger honeypot
   - Rate limiting prevents spam (5 requests/minute per IP)

### Development Testing

You can test the form locally by:

1. Ensuring VITE_SUPABASE_URL is set in `.env`
2. Ensuring RESEND_API_KEY is configured in Supabase Dashboard
3. Running the dev server
4. Filling out and submitting the contact form
5. Checking the browser console for any errors
6. Verifying email delivery

## Troubleshooting

### No Email Received

1. **Check Resend Dashboard**
   - Go to **Logs** section in Resend
   - Look for recent API calls
   - Check for any errors

2. **Check Browser Console**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Submit form and look for errors

3. **Check Network Tab**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Submit form
   - Look for request to `/functions/v1/send-contact-email`
   - Check response status and body

4. **Verify Supabase Logs**
   - Go to Supabase Dashboard
   - Navigate to **Edge Functions**
   - Click on `send-contact-email`
   - View logs for errors

### Common Issues

**"Configuration error" message:**
- Check that `VITE_SUPABASE_URL` is set in `.env`

**"Email service not configured" error:**
- Check that `RESEND_API_KEY` is set in Supabase Dashboard secrets

**"Failed to send email" error:**
- Check Resend API key is valid
- Check Resend account is active
- For production: Verify domain is verified

**Rate limit error:**
- Wait 1 minute and try again
- This protects against spam

## Security Features

1. **Honeypot Protection**: Hidden field that bots typically fill out
2. **Rate Limiting**: 5 submissions per IP per minute
3. **Input Validation**: Server-side validation of all fields
4. **CORS Headers**: Properly configured for security
5. **No Secrets in Frontend**: API key only in backend environment

## Monitoring

To monitor form submissions:

1. **Resend Dashboard**
   - View all sent emails
   - Track delivery rates
   - Monitor for failures

2. **Supabase Logs**
   - View Edge Function execution logs
   - Monitor for errors or issues

3. **Email Inbox**
   - Check info@mrbutterbloom.co.za regularly
   - Set up email forwarding if needed

## Production Deployment

Before going live:

1. ✅ Verify domain in Resend
2. ✅ Update Edge Function to use verified domain
3. ✅ Test form submission end-to-end
4. ✅ Verify email delivery to info@mrbutterbloom.co.za
5. ✅ Test error scenarios
6. ✅ Monitor logs for first few days

## Support

If issues persist:
- Check Resend documentation: https://resend.com/docs
- Check Supabase Edge Functions docs: https://supabase.com/docs/guides/functions
- Contact Resend support if email delivery issues
