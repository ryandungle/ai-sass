import { useFreeCounterStore } from "@/hooks/store";
import {
  checkApiLimit,
  getApiLimitCount,
  incrementApiLimit,
} from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-loJ2PHzknVnJebaXoXQUwvgU",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
  const { userId } = auth();
  const body = await req.json();
  const { messages } = body;
  const tag = req.nextUrl.searchParams.get("tag");
  const path = req.nextUrl.searchParams.get("path");

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (!configuration.apiKey) {
    return new NextResponse("OpenAI API key not configured", { status: 500 });
  }
  if (!messages) {
    return new NextResponse("Messages are required", { status: 400 });
  }

  const freeTrial = await checkApiLimit();
  if (!freeTrial) {
    return new NextResponse("API limit exceeded", { status: 403 });
  }

  return openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    })
    .then(({ data }) => {
      return incrementApiLimit().then(() => {
        return NextResponse.json(data.choices[0].message);
      });
    })
    .catch((err) => {
      console.log("[CONVERSATION_ERROR]", err);
      return new NextResponse("Internal error", { status: 500 });
    });
}
