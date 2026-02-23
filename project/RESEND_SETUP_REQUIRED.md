# URGENT: Contact Form Email Setup Required

## Current Issue
The contact form is not sending emails because the **RESEND_API_KEY** is not configured in Supabase Edge Functions.

## What You Need To Do

### Step 1: Get a Resend API Key

1. Go to [https://resend.com/signup](https://resend.com/signup) and create a free account
2. After signing up, go to the [API Keys page](https://resend.com/api-keys)
3. Click **"Create API Key"**
4. Name it: `Butterbloom Contact Form`
5. Copy the API key (it starts with `re_`)

### Step 2: Configure the API Key in Supabase

You have **two options** to set the secret:

#### Option A: Using Supabase Dashboard (Easiest)

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project: `iblqxwsrzouwaoatbvfx`
3. Click on **Project Settings** (gear icon in sidebar)
4. Click on **Edge Functions** in the left menu
5. Scroll down to **"Secrets"** section
6. Click **"Add new secret"**
7. Enter:
   - Name: `RESEND_API_KEY`
   - Value: Paste your Resend API key (the one that starts with `re_`)
8. Click **"Save"**

#### Option B: Using Supabase CLI (Alternative)

If you have the Supabase CLI installed:

```bash
# Set the secret
supabase secrets set RESEND_API_KEY=your_actual_api_key_here

# Verify it was set
supabase secrets list
```

### Step 3: Verify Domain (For Production)

Currently, the form uses Resend's test domain (`onboarding@resend.dev`). This works for testing but has limitations.

For production, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter: `mrbutterbloom.co.za`
4. Follow the DNS configuration instructions
5. Add the required DNS records to your domain registrar
6. Wait for verification (usually 5-15 minutes)

Once verified, the edge function will automatically use your verified domain.

### Step 4: Test the Form

After configuring the API key:

1. Go to your website: [https://www.mrbutterbloom.co.za](https://www.mrbutterbloom.co.za)
2. Scroll to the contact form
3. Fill out all required fields
4. Click "Request a Strategic Conversation"
5. You should see "Sending..." then be redirected to the thank you page
6. Check your inbox at `info@mrbutterbloom.co.za` for the email

### Troubleshooting

#### "Email service not configured" error
- This means the RESEND_API_KEY is not set in Supabase
- Follow Step 2 above to configure it

#### Email not received
1. Check your spam folder
2. Check Resend dashboard → [Logs](https://resend.com/logs) to see if emails are being sent
3. Verify your Resend account is active and not suspended
4. If using the test domain, note that it has sending limits

#### Still having issues?
1. Check the browser console (F12) for errors
2. Check Supabase Edge Function logs:
   - Dashboard → Edge Functions → send-contact-email → Logs
3. Verify the API key starts with `re_` and has no extra spaces

## Why This Happened

The contact form was previously using Netlify Forms, which doesn't automatically send emails. I've converted it back to use Supabase Edge Functions with Resend, which provides reliable email delivery. However, the Resend API key needs to be manually configured in your Supabase project settings.

## What Happens After Setup

Once configured, the contact form will:
- Send emails immediately when submitted
- Deliver to `info@mrbutterbloom.co.za`
- Include all form details in a professional HTML format
- Set reply-to as the user's email for easy responses
- Protect against spam with rate limiting and honeypot fields

## Support

If you encounter any issues:
- Resend Documentation: [https://resend.com/docs](https://resend.com/docs)
- Supabase Edge Functions: [https://supabase.com/docs/guides/functions](https://supabase.com/docs/guides/functions)
