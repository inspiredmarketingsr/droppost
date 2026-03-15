import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) { token.accessToken = account.access_token; token.refreshToken = account.refresh_token; }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export async function GET() {
  const session: any = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Get all channels the user has access to (including Brand Accounts)
    const res = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&mine=true",
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || "Failed to fetch channels" }, { status: res.status });
    }

    // Also try to get channels via managedByMe for Brand Accounts
    const brandRes = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&managedByMe=true",
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    const brandData = await brandRes.json();

    // Combine and deduplicate
    const allChannels = [...(data.items || []), ...(brandData.items || [])];
    const seen = new Set();
    const channels = allChannels.filter((ch: any) => {
      if (seen.has(ch.id)) return false;
      seen.add(ch.id);
      return true;
    }).map((ch: any) => ({
      id: ch.id,
      title: ch.snippet.title,
      thumbnail: ch.snippet.thumbnails?.default?.url || "",
      subscriberCount: ch.statistics?.subscriberCount || null,
    }));

    return NextResponse.json({ channels });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}