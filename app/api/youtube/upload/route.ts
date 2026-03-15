import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
  const session: any = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated or missing YouTube access" }, { status: 401 });
  }

  const { title, description, privacyStatus, videoUrl, channelId } = await req.json();

  if (!title || !videoUrl) {
    return NextResponse.json({ error: "Title and videoUrl are required" }, { status: 400 });
  }

  try {
    const videoResponse = await fetch(videoUrl);
    if (!videoResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch video from URL" }, { status: 400 });
    }
    const videoBuffer = await videoResponse.arrayBuffer();

    // Build upload URL — if channelId provided, use onBehalfOfContentOwner approach
    let uploadUrl = "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status";

    const metadataRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Length": String(videoBuffer.byteLength),
        "X-Upload-Content-Type": videoResponse.headers.get("content-type") || "video/mp4",
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
      const err = await metadataRes.text();
      return NextResponse.json({ error: "YouTube metadata upload failed", details: err }, { status: metadataRes.status });
    }

    const resumeUrl = metadataRes.headers.get("location");
    if (!resumeUrl) {
      return NextResponse.json({ error: "No upload URL returned from YouTube" }, { status: 500 });
    }

    const uploadRes = await fetch(resumeUrl, {
      method: "PUT",
      headers: {
        "Content-Type": videoResponse.headers.get("content-type") || "video/mp4",
        "Content-Length": String(videoBuffer.byteLength),
      },
      body: videoBuffer,
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      return NextResponse.json({ error: "YouTube video upload failed", details: err }, { status: uploadRes.status });
    }

    const result = await uploadRes.json();

    return NextResponse.json({
      success: true,
      videoId: result.id,
      url: `https://www.youtube.com/watch?v=${result.id}`,
    });
  } catch (error: any) {
    console.error("YouTube upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}