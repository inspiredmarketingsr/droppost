export default function TermsPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#111827" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>D</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 20 }}>DropPost</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ color: "#6B7280", fontSize: 14 }}>Last updated: March 14, 2026</p>
      </div>

      {[
        {
          title: "1. Acceptance of Terms",
          content: "By accessing or using DropPost at droppost-beta.vercel.app, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service."
        },
        {
          title: "2. Description of Service",
          content: "DropPost is a social media scheduling and management platform that allows users to plan, schedule, and publish content across multiple social media platforms including YouTube, Facebook, Instagram, TikTok, and Snapchat."
        },
        {
          title: "3. User Accounts",
          content: "You must sign in using a valid Google account to use DropPost. You are responsible for maintaining the security of your account and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account."
        },
        {
          title: "4. Acceptable Use",
          content: "You agree not to use DropPost to post content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable. You are solely responsible for the content you publish through our platform. You must comply with the terms of service of all connected social media platforms."
        },
        {
          title: "5. Connected Social Media Accounts",
          content: "When you connect social media accounts to DropPost, you grant us permission to post content on your behalf. You can revoke this permission at any time through the Settings page or through the respective social media platform's settings."
        },
        {
          title: "6. Intellectual Property",
          content: "You retain all rights to the content you create and publish through DropPost. By using our service, you grant DropPost a limited license to store and transmit your content solely for the purpose of providing the service."
        },
        {
          title: "7. Pricing and Payment",
          content: "DropPost offers a 14-day free trial. After the trial period, continued use requires a paid subscription starting from SRD 45/month. Prices are subject to change with 30 days notice."
        },
        {
          title: "8. Termination",
          content: "We reserve the right to suspend or terminate your account if you violate these Terms of Service. You may cancel your account at any time by contacting us at inspiredmarketingsr@gmail.com."
        },
        {
          title: "9. Limitation of Liability",
          content: "DropPost is provided 'as is' without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service."
        },
        {
          title: "10. Contact",
          content: "For questions about these Terms of Service, contact us at: inspiredmarketingsr@gmail.com"
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