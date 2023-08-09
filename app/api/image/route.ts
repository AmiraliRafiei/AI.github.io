import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai'

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscribe } from '@/lib/subscription';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json()
    const { prompt, amount = 1, resolation = "512x512"} = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 })
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 })
    }

    if (!resolation) {
      return new NextResponse("Resolation is required", { status: 400 })
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscribe();

    if (!freeTrial && !isPro) {
      return  new NextResponse("Free trial has expired", { status: 403 });
    }

    const respone = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolation,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(respone.data.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}