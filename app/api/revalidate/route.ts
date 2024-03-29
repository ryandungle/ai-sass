import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  console.log({ path, route: "revalidate" });

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
