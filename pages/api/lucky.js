// pages/api/lucky.js
import axios from 'axios';

export default async function handler(req, res) {
  const { birth, calendar, gender, time } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res
      .status(500)
      .json({ error: '서버에서 OPENAI_API_KEY 환경변수를 못 찾았습니다.' });
  }

  try {
    const luckyTextPrompt = `
생년월일: ${birth}
양력/음력: ${calendar}
성별: ${gender}
태어난 시간: ${time}

이번 질문에서는 사주 전체 해석은 하지 말고,
오늘의 '행운의 물건' 이름과 간단한 이유만 알려주세요.

반드시 아래 형식으로만, 두 줄로만 답변해 주세요.

행운의 물건: (물건 이름만 간단히)
이유: (왜 도움이 되는지 1~2문장으로 짧게)
    `.trim();

    const chatRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4.1-mini', // 네가 쓰는 모델명에 맞게
        messages: [
          {
            role: 'system',
            content:
              '너는 한국식 명리학을 바탕으로 오늘의 행운의 물건을 추천하는 도우미입니다. 지정한 형식 이외의 말은 하지 마세요.',
          },
          { role: 'user', content: luckyTextPrompt },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const luckyText = chatRes.data.choices[0].message.content || '';

    return res.status(200).json({
      luckyText,
    });
  } catch (error) {
    console.error('Lucky API error:', error.response?.data || error.message);

    return res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: error.message },
    });
  }
}
