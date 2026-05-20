import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'), // cheapest model for testing
    system: 'You are a helpful assistant that answers questions about our products and app.',
    messages,
  });

  return result.toUIMessageStreamResponse();
}