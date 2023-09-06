import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

// import { checkSubscription } from "@/lib/subscription";
// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
  const { userId } = auth();
  const body = await req.json();
  const { prompt, amount = 1, resolution = "512x512" } = body;
  const tag = req.nextUrl.searchParams.get("tag");

  if (!tag) {
    return NextResponse.json({ message: "Missing tag param" }, { status: 400 });
  }

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!configuration.apiKey) {
    return new NextResponse("OpenAI API Key not configured.", {
      status: 500,
    });
  }

  if (!prompt) {
    return new NextResponse("Prompt is required", { status: 400 });
  }

  if (!amount) {
    return new NextResponse("Amount is required", { status: 400 });
  }

  if (!resolution) {
    return new NextResponse("Resolution is required", { status: 400 });
  }
  const freeTrial = await checkApiLimit();
  if (!freeTrial) {
    return new NextResponse("API limit exceeded", { status: 403 });
  }
  // const freeTrial = await checkApiLimit();
  // const isPro = await checkSubscription();

  // if (!freeTrial && !isPro) {
  //   return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
  // }

  return openai
    .createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    })
    .then((response) => {
      return incrementApiLimit().then(() => {
        return NextResponse.json(response.data.data);
      });
    })
    .catch((error) => {
      console.log("[IMAGE_ERROR]", error);
      return new NextResponse("Internal Error", { status: 500 });
    });

  // if (!isPro) {
  //   await incrementApiLimit();
  // }
}
