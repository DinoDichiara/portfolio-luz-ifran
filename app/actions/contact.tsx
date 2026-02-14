"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = formData;

  // Validate inputs
  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required." };
  }

  try {
    // 1. Save to Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        subject,
        message,
      });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return { success: false, error: "Failed to save submission." };
    }

    // 2. Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["dichiaradino951@gmail.com"],
            subject: `[Portfolio] ${subject}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; border-bottom: 2px solid #c9a84c; padding-bottom: 10px;">
                  New Contact Form Submission
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                  <tr>
                    <td style="padding: 10px; font-weight: bold; color: #555; width: 100px;">Name:</td>
                    <td style="padding: 10px; color: #333;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; font-weight: bold; color: #555;">Email:</td>
                    <td style="padding: 10px; color: #333;">
                      <a href="mailto:${email}" style="color: #c9a84c;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; font-weight: bold; color: #555;">Subject:</td>
                    <td style="padding: 10px; color: #333;">${subject}</td>
                  </tr>
                </table>
                <div style="margin-top: 20px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #c9a84c;">
                  <h3 style="margin-top: 0; color: #555;">Message:</h3>
                  <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            `,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Resend error:", errorData);
        }
      } catch (emailError) {
        console.error("Email send error:", emailError);
        // Don't fail the whole submission if email fails - data is already saved
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
