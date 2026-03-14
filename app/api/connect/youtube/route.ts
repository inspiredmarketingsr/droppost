import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.redirect("/?error=not_logged_in");

  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("access_token");

  if (accessToken) {
    await supabase.from("connected_accounts").upsert({
      user_id: session.user.email,
      platform: "youtube",
      access_token: accessToken,
    });
  }

  return NextResponse.redirect("/");}