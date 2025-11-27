// app/api/kimi/route.js
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.HF_TOKEN, // .env.local에 넣은 HF 토큰
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // messages 예:
    // [{ role: "user", content: "안녕, 자기소개 해줘" }]
    const completion = await client.chat.completions.create({
      model: 'moonshotai/Kimi-K2-Instruct-0905',
      messages,
    });

    return Response.json({
      reply: completion.choices?.[0]?.message?.content ?? '',
      raw: completion,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Kimi API 서버 에러' }), {
      status: 500,
    });
  }
}
