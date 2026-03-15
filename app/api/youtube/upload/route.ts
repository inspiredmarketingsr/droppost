import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

/* ═══ Token refresh helper ═══ */
async function refreshAccessToken(token: any) {
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw data;

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
      // Google only sends a new refresh_token sometimes — keep the old one
      refreshToken: data.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // First sign-in — store tokens + expiry
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 3600 * 1000,
        };
      }

      // Token still valid — return as-is
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Token expired — refresh it
      console.log("Access token expired, refreshing...");
      return refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.error = token.error; // surface refresh errors to client
      return session;
    },
  },
};

export async function POST(req: NextRequest) {
  const session: any = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json(
      { error: "Not authenticated or missing YouTube access" },
      { status: 401 }
    );
  }

  // If token refresh failed, tell the client to re-authenticate
  if (session.error === "RefreshAccessTokenError") {
    return NextResponse.json(
      { error: "YouTube token expired. Please reconnect your account." },
      { status: 401 }
    );
  }

  const { title, description, privacyStatus, videoUrl, channelId } =
    await req.json();

  if (!title || !videoUrl) {
    return NextResponse.json(
      { error: "Title and videoUrl are required" },
      { status: 400 }
    );
  }

  try {
    /* ── 1. Fetch the video file ── */
    const videoResponse = await fetch(videoUrl);
    if (!videoResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch video from URL" },
        { status: 400 }
      );
    }
    const videoBuffer = await videoResponse.arrayBuffer();
    const contentType =
      videoResponse.headers.get("content-type") || "video/mp4";

    /* ── 2. Start resumable upload (metadata) ── */
    const uploadUrl =
      "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status";

    const metadataRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Length": String(videoBuffer.byteLength),
        "X-Upload-Content-Type": contentType,
      },
      body: JSON.stringify({
        snippet: {
          title: title.slice(0, 100),
          description: description || "",
          categoryId: "22",
          ...(channelId ? { channelId } : {}),
        },
        status: {
          privacyStatus: privacyStatus || "private",
          selfDeclaredMadeForKids: false,
        },
      }),
    });

    if (!metadataRes.ok) {
      const errText = await metadataRes.text();
      console.error("YouTube metadata error:", metadataRes.status, errText);

      // Parse for user-friendly message
      let detail = errText;
      try {
        const parsed = JSON.parse(errText);
        detail =
          parsed.error?.message ||
          parsed.error?.errors?.[0]?.reason ||
          errText;
      } catch {}

      return NextResponse.json(
        { error: `YouTube error: ${detail}` },
        { status: metadataRes.status }
      );
    }

    const resumeUrl = metadataRes.headers.get("location");
    if (!resumeUrl) {
      return NextResponse.json(
        { error: "No upload URL returned from YouTube" },
        { status: 500 }
      );
    }

    /* ── 3. Upload the video bytes ── */
    const uploadRes = await fetch(resumeUrl, {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(videoBuffer.byteLength),
      },
      body: videoBuffer,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      console.error("YouTube upload error:", uploadRes.status, errText);
      return NextResponse.json(
        { error: "YouTube video upload failed", details: errText },
        { status: uploadRes.status }
      );
    }

    const result = await uploadRes.json();

    return NextResponse.json({
      success: true,
      videoId: result.id,
      url: `https://www.youtube.com/watch?v=${result.id}`,
    });
  } catch (error: any) {
    console.error("YouTube upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}