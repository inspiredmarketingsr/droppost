import Link from "next/link";

export default function PrivacyPage() {
  const S = (t: string, c: string) => (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#7C3AED" }}>{t}</h2>
      <div style={{ fontSize: 15, lineHeight: 1.85, color: "#374151", whiteSpace: "pre-line" }}>{c}</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#111827" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>D</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: 20, color: "#111827" }}>DropPost</span>
            </Link>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
          <p style={{ color: "#6B7280", fontSize: 14 }}>Last updated: March 15, 2026</p>
        </div>

        {S("1. Introduction",
`DropPost ("we", "us", or "our") is operated by Inspired Marketing Agency, based in Paramaribo, Suriname. DropPost is a social media scheduling and publishing platform available at https://droppost.app.

This Privacy Policy explains how we collect, use, store, share, and protect your personal information and data from third-party services (including Google, YouTube, Meta/Facebook, Instagram, LinkedIn, TikTok, and Snapchat) when you use our service.

By using DropPost, you agree to the collection and use of information in accordance with this policy. If you do not agree with this policy, please do not use our service.`)}

        {S("2. Information We Collect",
`We collect the following categories of personal data when you use or interact with DropPost:

Account Information: Your name, email address, and profile picture provided through Google Sign-In (OAuth 2.0).

Social Media Account Data: When you connect social media accounts (YouTube, Facebook, Instagram, LinkedIn, TikTok, Snapchat), we collect access tokens, refresh tokens, and basic channel/page information (such as channel name, channel ID, and profile thumbnail) necessary to post content on your behalf.

Content You Create: Post text, images, videos, scheduled dates/times, and associated metadata that you create within DropPost.

Usage Data: Information about how you interact with DropPost, including pages visited, features used, and actions taken within the platform.

We do not collect any information beyond what is necessary to provide and improve our service.`)}

        {S("3. How We Use Your Information",
`We use the information we collect solely to provide, maintain, and improve the DropPost service. Specifically:

- To authenticate you via Google OAuth 2.0 and manage your account.
- To schedule, manage, and publish social media content on your behalf to your connected platforms.
- To display your connected social media accounts and their status within the app.
- To provide customer support and respond to your inquiries.
- To improve the functionality and user experience of DropPost.

We do NOT use your data for advertising, marketing to third parties, tracking, profiling, or any purpose unrelated to providing or improving DropPost's core functionality.

We do NOT sell, rent, lease, or trade your personal information or Google user data to any third party.`)}

        {S("4. Google API Services & YouTube Data",
`DropPost uses Google OAuth 2.0 for user authentication and the YouTube Data API v3 to enable video uploads, channel management, and content publishing on your behalf.

DropPost's use and transfer of information received from Google APIs to any other app will adhere to the Google API Services User Data Policy, including the Limited Use requirements. You can review this policy at: https://developers.google.com/terms/api-services-user-data-policy

Specifically regarding Google and YouTube data:

Scopes We Request:
- "youtube" scope: To list and identify your YouTube channels so you can select which channel to publish to.
- "youtube.upload" scope: To upload videos and Shorts directly to your selected YouTube channel on your behalf.

How We Use Google Data: We use your Google account information solely for authentication and your YouTube access tokens solely to upload videos and manage content on your behalf. We do not use Google data for any other purpose.

Data Storage: YouTube access tokens and refresh tokens are stored securely in our database. Channel information (ID, name, thumbnail) is stored to display your connected channel within the app.

Data Retention: We retain your YouTube data only for as long as your account is active and the YouTube channel remains connected. Upon disconnecting your YouTube account or deleting your DropPost account, all associated YouTube data (including tokens and channel information) will be deleted within 7 calendar days.

Data Deletion: You can disconnect your YouTube account at any time from Settings > Connected Accounts. You may also request complete deletion of your data by visiting our Data Deletion page at https://droppost.app/data-deletion or by contacting us. We will delete all stored YouTube data within 7 calendar days of your request.

Revoking Access: You can revoke DropPost's access to your Google account at any time by visiting https://myaccount.google.com/permissions and removing DropPost from your authorized apps.`)}

        {S("5. Meta (Facebook & Instagram) Data",
`When you connect your Facebook Pages or Instagram accounts to DropPost, we access your data through the Meta Graph API.

Data We Access: Page name, page ID, page access tokens, Instagram business account ID, and basic profile information necessary to publish content on your behalf.

How We Use It: Solely to schedule and publish posts, stories, and reels to your connected Facebook Pages and Instagram accounts.

Data Sharing: When you publish content through DropPost, we transmit your content (text, images, videos) to Meta's API. We do not share your Meta data with any other third party.

Data Retention & Deletion: Same policies apply as described in Section 10 (Data Retention & Deletion). You can also submit a data deletion request at https://droppost.app/data-deletion.`)}

        {S("6. LinkedIn Data",
`When you connect your LinkedIn account to DropPost, we access your data through the LinkedIn API.

Data We Access: Profile information, access tokens, and organization/company page details necessary to publish content on your behalf.

How We Use It: Solely to schedule and publish posts and articles to your connected LinkedIn profile or company page.

Data Retention & Deletion: Same policies apply as described in Section 10 (Data Retention & Deletion).`)}

        {S("7. TikTok Data",
`When you connect your TikTok account to DropPost, we access your data through the TikTok API.

Data We Access: Account information, access tokens, and publishing permissions necessary to upload videos on your behalf.

How We Use It: Solely to schedule and publish video content to your connected TikTok account.

Data Retention & Deletion: Same policies apply as described in Section 10 (Data Retention & Deletion).`)}

        {S("8. Snapchat Data",
`When you connect your Snapchat account to DropPost, we access your data through Snap Kit.

Data We Access: Account information and access tokens necessary to publish Stories on your behalf.

How We Use It: Solely to schedule and publish Stories to your connected Snapchat account.

Data Retention & Deletion: Same policies apply as described in Section 10 (Data Retention & Deletion).`)}

        {S("9. Data Storage & Security",
`Your data is stored securely using Supabase, a PostgreSQL-based database platform with enterprise-grade security hosted on AWS infrastructure.

Security Measures We Implement:
- All data transmission is encrypted using TLS/SSL (HTTPS).
- Access tokens for connected social media accounts are stored securely in our database.
- We use Row Level Security (RLS) policies to ensure users can only access their own data.
- Our application is hosted on Vercel with automatic SSL certificate provisioning.
- We restrict internal access to user data to authorized personnel only.

While we implement reasonable and appropriate technical and organizational measures to protect your personal information, no method of electronic storage or transmission over the internet is 100% secure. We cannot guarantee absolute security.`)}

        {S("10. Data Retention & Deletion",
`We retain your personal data and connected account data for as long as your DropPost account is active or as needed to provide you with our services.

You may request deletion of your data at any time by:
- Visiting our Data Deletion page at https://droppost.app/data-deletion
- Disconnecting individual social media accounts from Settings > Connected Accounts.
- Contacting us at inspiredmarketingsr@gmail.com to request full account deletion.

Upon receiving a deletion request or account disconnection:
- All stored access tokens, refresh tokens, and associated platform data will be deleted within 7 calendar days.
- All posts, media, and content data associated with your account will be permanently deleted within 30 calendar days.
- We will send you a confirmation email once the deletion process is complete.
- Deletion of data stored by DropPost does not affect data stored by YouTube, Meta, LinkedIn, TikTok, Snapchat, or any other third-party platform.

We may retain certain data as required by applicable law or for legitimate business purposes (such as resolving disputes or enforcing our agreements).`)}

        {S("11. Cookies & Tracking",
`DropPost uses minimal cookies and similar technologies:

Essential Cookies: We use session cookies for authentication (NextAuth.js session token). These are strictly necessary for the service to function and cannot be disabled.

No Tracking Cookies: We do NOT use any third-party tracking cookies, advertising cookies, or analytics cookies that track your behavior across other websites.

No Third-Party Analytics: We do not use Google Analytics, Facebook Pixel, or any other third-party analytics or tracking service.

Local Storage: We may store user preferences (such as dark mode setting and language preference) in your browser's local storage. This data stays on your device and is not transmitted to our servers.`)}

        {S("12. Data Sharing & Disclosure",
`We do not share, sell, rent, or trade your personal data or any data received from Google APIs with any third parties, except in the following limited circumstances:

- Service Providers: We share data with third-party service providers solely as necessary to provide our service (e.g., Supabase for database hosting, Vercel for application hosting). These providers are contractually obligated to protect your data.
- Social Media Platforms: When you use DropPost to publish content, we transmit that content (text, images, videos) to the social media platforms you have connected (YouTube, Facebook, Instagram, LinkedIn, TikTok, Snapchat). This is the core function of our service and only occurs with your explicit action.
- Legal Requirements: We may disclose your data if required by law, legal process, or government request.
- Safety: We may disclose data to protect the rights, property, or safety of DropPost, our users, or the public.

We do NOT use Google user data for serving advertisements. We do NOT allow humans to read your data except where necessary to provide support (with your consent), for security purposes, or to comply with applicable law.`)}

        {S("13. Your Rights (GDPR, CCPA & International)",
`Depending on your jurisdiction, you may have the following rights regarding your personal data:

For All Users:
- Access: You have the right to request a copy of the personal data we hold about you.
- Correction: You have the right to request correction of inaccurate or incomplete data.
- Deletion: You have the right to request deletion of your personal data (see Section 10 or visit https://droppost.app/data-deletion).
- Portability: You have the right to request your data in a portable format.
- Revocation: You have the right to revoke DropPost's access to your connected social media accounts at any time.
- Objection: You have the right to object to our processing of your personal data.

For EU/EEA Users (GDPR):
- You have the right to lodge a complaint with your local data protection authority.
- Our legal basis for processing your data is your consent (provided when you connect your accounts) and legitimate interest (to provide the service).
- You may withdraw consent at any time by disconnecting your accounts or requesting data deletion.

For California Users (CCPA):
- You have the right to know what personal information we collect and how we use it.
- You have the right to request deletion of your personal information.
- You have the right to opt out of the sale of your personal information. Note: We do NOT sell your personal information.
- We will not discriminate against you for exercising your privacy rights.

To exercise any of these rights, contact us at inspiredmarketingsr@gmail.com or visit https://droppost.app/data-deletion. We will respond to your request within 30 days.`)}

        {S("14. Children's Privacy",
`DropPost is not directed to children under the age of 13 (or 16 in certain jurisdictions). We do not knowingly collect personal information from children. If we become aware that we have collected data from a child without parental consent, we will take steps to delete that information promptly. If you believe a child has provided us with personal data, please contact us at inspiredmarketingsr@gmail.com.`)}

        {S("15. International Data Transfers",
`DropPost is operated from Suriname. Your data may be transferred to and processed in countries other than your own (including the United States, where our hosting providers operate). By using DropPost, you consent to such transfers. We ensure that appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.`)}

        {S("16. Changes to This Privacy Policy",
`We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will notify you by updating the "Last updated" date at the top of this page and, where appropriate, providing additional notice within the app or via email.

We encourage you to review this Privacy Policy periodically to stay informed about how we protect your data. Your continued use of DropPost after any changes constitutes your acceptance of the updated policy.`)}

        {S("17. Contact Us",
`If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:

Inspired Marketing Agency
Email: inspiredmarketingsr@gmail.com
Location: Paramaribo, Suriname
Website: https://droppost.app
Help Center: https://droppost.app/help
Data Deletion: https://droppost.app/data-deletion`)}

        <div style={{ background: "#F3F4F6", borderRadius: 12, padding: "16px 20px", marginTop: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#7C3AED", marginBottom: 6 }}>Google API Services User Data Policy Compliance</div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "#6B7280", margin: 0 }}>
            DropPost's use and transfer to any other app of information received from Google APIs will adhere to the{" "}
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#7C3AED", textDecoration: "underline" }}>
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
        </div>

        <div style={{ background: "#FEF3C7", borderRadius: 12, padding: "16px 20px", marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E", marginBottom: 6 }}>Meta Platform Data Policy Compliance</div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "#92400E", margin: 0 }}>
            DropPost complies with the{" "}
            <a href="https://developers.facebook.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#92400E", textDecoration: "underline" }}>
              Meta Platform Terms
            </a>
            {" "}and{" "}
            <a href="https://developers.facebook.com/devpolicy/" target="_blank" rel="noopener noreferrer" style={{ color: "#92400E", textDecoration: "underline" }}>
              Developer Policies
            </a>
            . Data received from Meta APIs is used solely to provide the DropPost service and is not shared with third parties.
          </p>
        </div>

        <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 24, marginTop: 20, display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a href="/" style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>← Back to DropPost</a>
          <a href="/terms" style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>Terms of Service</a>
          <a href="/data-deletion" style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>Data Deletion</a>
          <a href="/help" style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>Help Center</a>
        </div>
      </div>
    </div>
  );
}