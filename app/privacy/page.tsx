export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#111827" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>D</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 20 }}>DropPost</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: "#6B7280", fontSize: 14 }}>Last updated: March 14, 2026</p>
      </div>

      {[
        {
          title: "1. Introduction",
          content: "DropPost ('we', 'us', or 'our') operates the DropPost social media scheduling platform. This Privacy Policy explains how we collect, use, and protect your personal information when you use our service at droppost-beta.vercel.app."
        },
        {
          title: "2. Information We Collect",
          content: "We collect information you provide directly to us, including your name, email address, and profile information when you sign in with Google. We also collect data about your social media accounts when you connect them to our platform, including access tokens necessary to post content on your behalf."
        },
        {
          title: "3. How We Use Your Information",
          content: "We use the information we collect to provide and improve our services, including scheduling and publishing social media content on your behalf. We use Google OAuth to authenticate users and YouTube Data API to upload and manage YouTube content. We do not sell your personal information to third parties."
        },
        {
          title: "4. Google and YouTube Data",
          content: "DropPost uses Google OAuth 2.0 for authentication and the YouTube Data API v3 to enable video uploads and management on your behalf. Our use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. We only request permissions necessary to provide our service."
        },
        {
          title: "5. Data Storage",
          content: "Your data is stored securely using Supabase, a PostgreSQL database hosted on AWS infrastructure. Access tokens for connected social media accounts are stored encrypted. We retain your data for as long as your account is active."
        },
        {
          title: "6. Data Sharing",
          content: "We do not share your personal data with third parties except as necessary to provide our service (e.g., posting to social media platforms you have connected). We may share data if required by law."
        },
        {
          title: "7. Your Rights",
          content: "You have the right to access, correct, or delete your personal data at any time. You can disconnect your social media accounts from within the app settings. To request deletion of your account and data, contact us at inspiredmarketingsr@gmail.com."
        },
        {
          title: "8. Security",
          content: "We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure."
        },
        {
          title: "9. Contact Us",
          content: "If you have any questions about this Privacy Policy, please contact us at: inspiredmarketingsr@gmail.com"
        }
      ].map(section => (
        <div key={section.title} style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#7C3AED" }}>{section.title}</h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#374151" }}>{section.content}</p>
        </div>
      ))}

      <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 24, marginTop: 40 }}>
        <a href="/" style={{ color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>← Back to DropPost</a>
      </div>
    </div>
  );
}