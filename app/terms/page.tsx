export default function TermsPage() {
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
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>D</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 20 }}>DropPost</span>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Terms of Service</h1>
          <p style={{ color: "#6B7280", fontSize: 14 }}>Last updated: March 15, 2026</p>
        </div>

        {S("1. Acceptance of Terms",
`By accessing or using DropPost at https://droppost.app ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service.

These Terms constitute a legally binding agreement between you ("User", "you", or "your") and Inspired Marketing Agency ("DropPost", "we", "us", or "our"), the operator of the DropPost platform.

We reserve the right to update or modify these Terms at any time. We will notify you of material changes by updating the "Last updated" date and, where appropriate, providing notice within the app. Your continued use of the Service after changes are posted constitutes your acceptance of the revised Terms.`)}

        {S("2. Description of Service",
`DropPost is a social media scheduling, management, and publishing platform that allows users to:

- Create, schedule, and publish content across multiple social media platforms, including YouTube, Facebook, Instagram, TikTok, and Snapchat.
- Upload and manage videos, images, and text-based posts.
- Manage multiple workspaces for different brands or businesses.
- Collaborate with team members on content creation and approval workflows.
- View analytics and performance metrics for published content.

DropPost acts as a tool to facilitate content publishing. We do not own or control the social media platforms you connect to, and your use of those platforms is subject to their respective terms of service.`)}

        {S("3. Eligibility",
`To use DropPost, you must:

- Be at least 18 years of age, or the age of majority in your jurisdiction.
- Have the authority to enter into these Terms on behalf of yourself or the entity you represent.
- Have a valid Google account for authentication purposes.
- Comply with all applicable local, national, and international laws and regulations.

If you are using DropPost on behalf of a business or organization, you represent and warrant that you have the authority to bind that entity to these Terms.`)}

        {S("4. User Accounts",
`You must sign in using a valid Google account to use DropPost. By signing in, you agree to:

- Provide accurate and complete information.
- Maintain the security and confidentiality of your account credentials.
- Notify us immediately of any unauthorized access or use of your account.
- Accept responsibility for all activities that occur under your account.

You may not share your account credentials with others or allow others to access your account. We are not liable for any loss or damage arising from your failure to protect your account.`)}

        {S("5. Connected Social Media Accounts",
`When you connect third-party social media accounts to DropPost, you:

- Grant DropPost permission to access your account data and publish content on your behalf, as described in our Privacy Policy.
- Represent that you have the authority to connect such accounts and grant the necessary permissions.
- Acknowledge that you remain solely responsible for complying with the terms of service of each connected platform.
- Can revoke DropPost's access at any time through Settings > Connected Accounts within the app, or through the respective platform's authorization settings.

DropPost is not responsible for any actions taken by third-party platforms, including but not limited to content removal, account suspension, or policy changes that may affect the Service.`)}

        {S("6. YouTube API Services",
`DropPost uses the YouTube Data API v3 to provide video upload and channel management features. By using these features, you agree to be bound by the YouTube Terms of Service (https://www.youtube.com/t/terms).

You acknowledge that:
- Content uploaded through DropPost to YouTube is subject to YouTube's Community Guidelines and Terms of Service.
- DropPost does not guarantee successful uploads, as YouTube may reject content based on its policies.
- You can revoke DropPost's access to your YouTube account at any time via https://myaccount.google.com/permissions.
- DropPost's use of YouTube API data is governed by our Privacy Policy and the Google API Services User Data Policy.`)}

        {S("7. Acceptable Use",
`You agree to use DropPost only for lawful purposes and in accordance with these Terms. You agree NOT to:

- Use the Service to post, schedule, or distribute content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.
- Use the Service to infringe upon the intellectual property rights of others.
- Use the Service to distribute spam, malware, or any unsolicited commercial communications.
- Attempt to gain unauthorized access to DropPost's systems, other user accounts, or connected third-party platforms.
- Use the Service in any manner that could disable, overburden, damage, or impair the Service.
- Use automated scripts, bots, or other means to access the Service without our express written permission.
- Resell, sublicense, or redistribute the Service without our written consent.
- Use the Service to violate the terms of service of any connected social media platform.

You are solely responsible for all content you create, schedule, and publish through DropPost. We do not pre-screen or monitor user content but reserve the right to remove content or suspend accounts that violate these Terms.`)}

        {S("8. Intellectual Property",
`You retain all ownership rights to the content you create and publish through DropPost, including text, images, videos, and other media.

By using the Service, you grant DropPost a limited, non-exclusive, royalty-free license to store, process, and transmit your content solely for the purpose of providing and improving the Service. This license terminates when you delete your content or close your account.

DropPost and its logo, design, and branding are the intellectual property of Inspired Marketing Agency. You may not use our trademarks, logos, or branding without our prior written consent.`)}

        {S("9. Pricing & Payments",
`DropPost offers the following pricing structure:

- Free Trial: 14 days of full access, no credit card required.
- Paid Subscription: Starting from SRD 45/month after the trial period.

Payment terms:
- Subscriptions are billed on a recurring monthly basis.
- You are responsible for all applicable taxes.
- Prices are subject to change with at least 30 days prior notice.
- Failure to pay may result in suspension or termination of your account.
- Refunds are handled on a case-by-case basis. Contact us for refund requests.

We reserve the right to modify pricing and subscription plans at any time. Changes will not affect your current billing cycle.`)}

        {S("10. Service Availability & Modifications",
`We strive to maintain the Service's availability and reliability. However:

- The Service is provided on an "as available" basis.
- We do not guarantee uninterrupted, error-free, or secure access to the Service.
- We may modify, suspend, or discontinue any part of the Service at any time, with or without notice.
- Scheduled maintenance will be communicated in advance where possible.
- We are not liable for any downtime, interruptions, or losses resulting from platform changes by third-party social media services.`)}

        {S("11. Termination",
`Either party may terminate this agreement at any time:

By You: You may cancel your account at any time by contacting us at inspiredmarketingsr@gmail.com or through the app settings. Upon cancellation, your data will be handled as described in our Privacy Policy.

By Us: We reserve the right to suspend or terminate your account, without prior notice, if:
- You violate these Terms of Service.
- You engage in fraudulent, abusive, or illegal activity.
- You fail to pay subscription fees after reasonable notice.
- Continued provision of the Service to you is no longer commercially viable.

Upon termination:
- Your access to the Service will be revoked immediately.
- Your content and data will be retained for 30 days, after which it will be permanently deleted.
- Any outstanding payment obligations remain due.`)}

        {S("12. Limitation of Liability",
`To the maximum extent permitted by applicable law:

- DropPost is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, whether express, implied, statutory, or otherwise.
- We disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
- We are not liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses.
- Our total liability to you for all claims arising from or related to the Service shall not exceed the amount you have paid us in the 12 months preceding the claim.
- We are not responsible for content published through the Service to third-party platforms, nor for any actions taken by those platforms in response to such content.
- We are not liable for any failure or delay in publishing content caused by third-party platform outages, API changes, or rate limiting.`)}

        {S("13. Indemnification",
`You agree to indemnify, defend, and hold harmless DropPost, Inspired Marketing Agency, and their officers, directors, employees, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorney's fees) arising from:

- Your use of the Service.
- Your violation of these Terms.
- Your violation of any third-party rights, including intellectual property rights.
- Content you create, schedule, or publish through the Service.
- Your violation of any applicable law or regulation.`)}

        {S("14. Dispute Resolution",
`Any disputes arising from or relating to these Terms or the Service shall be:

- First attempted to be resolved through good-faith negotiation between the parties.
- If negotiation fails, disputes shall be resolved through binding arbitration in accordance with the laws of the Republic of Suriname.
- The arbitration shall take place in Paramaribo, Suriname.
- Each party shall bear its own costs of arbitration.

These Terms shall be governed by and construed in accordance with the laws of the Republic of Suriname, without regard to its conflict of law provisions.`)}

        {S("15. Severability",
`If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, shall be severed from these Terms. The remaining provisions shall continue in full force and effect.`)}

        {S("16. Entire Agreement",
`These Terms, together with our Privacy Policy and any other agreements or policies referenced herein, constitute the entire agreement between you and DropPost regarding your use of the Service and supersede all prior agreements, understandings, and communications, whether written or oral.`)}

        {S("17. Contact Us",
`If you have any questions about these Terms of Service, please contact us at:

Inspired Marketing Agency
Email: inspiredmarketingsr@gmail.com
Location: Paramaribo, Suriname
Website: https://droppost.app`)}

        <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 24, marginTop: 20, display: "flex", gap: 20 }}>
          <a href="/" style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>← Back to DropPost</a>
          <a href="/privacy" style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>Privacy Policy →</a>
        </div>
      </div>
    </div>
  );
}