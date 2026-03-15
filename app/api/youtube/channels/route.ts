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
    const allChannels: any[] = [];
    const seen = new Set();

    // 1. Get user's own channel(s)
    const mineRes = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    const mineData = await mineRes.json();
    if (mineData.items) {
      for (const ch of mineData.items) {
        if (!seen.has(ch.id)) { seen.add(ch.id); allChannels.push(ch); }
      }
    }

    // 2. Get Brand Account / managed channels via channel sections
    // Use the YouTube Data API to list accounts the user can act as
    const accountsRes = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&managedByMe=true&maxResults=50",
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    const accountsData = await accountsRes.json();
    if (accountsData.items) {
      for (const ch of accountsData.items) {
        if (!seen.has(ch.id)) { seen.add(ch.id); allChannels.push(ch); }
      }
    }

    // 3. Try to get channels from subscriptions or channel memberships
    // This uses the "listByHandle" approach - get channels from Google account
    const delegateRes = await fetch(
      "https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true&maxResults=50",
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    const delegateData = await delegateRes.json();
    if (delegateData.items) {
      for (const ch of delegateData.items) {
        if (!seen.has(ch.id)) { seen.add(ch.id); allChannels.push(ch); }
      }
    }

    const channels = allChannels.map((ch: any) => ({
      id: ch.id,
      title: ch.snippet?.title || "Unknown",
      thumbnail: ch.snippet?.thumbnails?.default?.url || "",
      description: ch.snippet?.description?.slice(0, 100) || "",
      subscriberCount: ch.statistics?.subscriberCount || "0",
      videoCount: ch.statistics?.videoCount || "0",
    }));

    return NextResponse.json({ channels });
  } catch (err: any) {
    console.error("Channel fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}