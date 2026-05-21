import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log("chatbot messages", messages)

  // const result = streamText({
  //   model: anthropic('claude-haiku-4-5-20251001'), // cheapest model for testing
  //   system: 'You are a helpful assistant that answers questions about our products and app.',
  //   messages,
  // });

  return NextResponse.json({ message: "Hello" }, { status: 200 });
}