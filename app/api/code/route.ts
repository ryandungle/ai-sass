import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};

export async function POST(req: Request) {
  const { userId } = auth();
  const body = await req.json();
  const { messages } = body;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!configuration.apiKey) {
    return new NextResponse("OpenAI API Key not configured.", {
      status: 500,
    });
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
      messages: [instructionMessage, ...messages],
    })
    .then((response) => {
      return incrementApiLimit().then(() =>
        NextResponse.json(response.data.choices[0].message)
      );
    })
    .catch((err) => {
      console.log("[CODE_ERROR]", err);
      return new NextResponse("Internal Error", { status: 500 });
    });
}
