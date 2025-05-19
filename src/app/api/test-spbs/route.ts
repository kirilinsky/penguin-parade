import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabase";

const BUCKET = "penguins";
const TEST_DEST = "test-assets/copied-image.webp";
let TEST_SOURCE = "test-assets/test1.webp";

export async function GET() {
  try {
    const copyRes = await supabaseServer.storage
      .from(BUCKET)
      .copy(TEST_SOURCE, TEST_DEST);

    if (copyRes.error) {
      console.error("Copy error 1:", copyRes.error.message);
      return NextResponse.json(
        { error: "Copy failed 2", details: copyRes.error.message },
        { status: 500 }
      );
    }

    const { data: urlData } = supabaseServer.storage
      .from(BUCKET)
      .getPublicUrl(TEST_DEST);

    const publicUrl = urlData?.publicUrl;

    const headCheck = publicUrl
      ? await fetch(publicUrl, { method: "HEAD" })
      : null;

    if (!headCheck?.ok) {
      return NextResponse.json(
        {
          error: "File copied but not available via CDN",
          url: publicUrl,
          status: headCheck?.status,
        },
        { status: 502 }
      );
    }

    const removeRes = await supabaseServer.storage
      .from(BUCKET)
      .remove([TEST_DEST]);

    if (removeRes.error) {
      console.error("Remove error:", removeRes.error.message);
      return NextResponse.json(
        { error: "Remove failed", details: removeRes.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: "Copy → URL → HEAD check → Remove all passed ✅",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected failure", details: String(err) },
      { status: 500 }
    );
  }
}
