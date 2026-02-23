import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  website?: string;
  pageUrl?: string;
  timestamp?: string;
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const clientIP = req.headers.get("x-forwarded-for") || "unknown";

    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const formData: ContactFormData = await req.json();

    if (formData.website && formData.website.trim() !== "") {
      console.log("Honeypot triggered - potential spam");
      return new Response(
        JSON.stringify({ success: true, message: "Form submitted successfully" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("CRITICAL: RESEND_API_KEY not configured in Supabase Edge Function Secrets");
      console.error("Please configure the API key in Supabase Dashboard:");
      console.error("1. Go to Project Settings > Edge Functions > Secrets");
      console.error("2. Add secret: RESEND_API_KEY");
      console.error("3. Get your API key from https://resend.com/api-keys");
      return new Response(
        JSON.stringify({
          error: "Email service not configured. Please contact the administrator.",
          details: "RESEND_API_KEY environment variable is missing"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const serviceLabel = formData.service || "General Inquiry";
    const timestamp = formData.timestamp || new Date().toISOString();
    const pageUrl = formData.pageUrl || "Not provided";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ef4444 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #374151; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #e5e7eb; }
            .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Butterbloom Lead: ${formData.name}</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">${serviceLabel}</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
              </div>
              ${formData.company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${formData.company}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Primary Interest:</div>
                <div class="value">${serviceLabel}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
              </div>
              <div class="field">
                <div class="label">Page URL:</div>
                <div class="value">${pageUrl}</div>
              </div>
              <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date(timestamp).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the Butterbloom Media contact form.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Butterbloom Contact Form <onboarding@resend.dev>",
        to: ["info@mrbutterbloom.co.za"],
        reply_to: formData.email,
        subject: `New Butterbloom Lead: ${formData.name} - ${serviceLabel}`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend API error response:", resendResponse.status, resendResponse.statusText);
      console.error("Resend API error details:", errorText);

      let errorMessage = "Failed to send email. Please try again or contact us directly.";

      if (resendResponse.status === 401) {
        console.error("CRITICAL: Invalid RESEND_API_KEY - Check your API key at https://resend.com/api-keys");
        errorMessage = "Email service authentication failed. Please contact the administrator.";
      } else if (resendResponse.status === 429) {
        console.error("Rate limit reached on Resend API");
        errorMessage = "Too many emails sent. Please try again later.";
      }

      return new Response(
        JSON.stringify({ error: errorMessage, statusCode: resendResponse.status }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const result = await resendResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for reaching out. We'll be in touch soon."
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again or contact us directly at info@mrbutterbloom.co.za" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
