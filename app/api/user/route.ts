import { getApiLimitCount } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized!!!" }, { status: 401 });
  }

  return getApiLimitCount()
    .then((count) => {
      return NextResponse.json({ limitCount: count });
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { error: "error fetching apiLimit" },
        { status: 401 }
      );
    });
}
