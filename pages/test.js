'use client';

import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/kimi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await res.json();
      setAnswer(data.reply ?? '응답이 없습니다.');
    } catch (e) {
      console.error(e);
      setAnswer('에러가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Kimi (Hugging Face) 테스트</h1>
      <textarea
        style={{ width: '100%', height: 100 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Kimi에게 보낼 메시지를 입력하세요."
      />
      <br />
      <button onClick={handleSend} disabled={loading}>
        {loading ? '생성 중...' : '보내기'}
      </button>
      <h2>응답</h2>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          background: '#f5f5f5',
          padding: 12,
          borderRadius: 8,
        }}
      >
        {answer}
      </pre>
    </main>
  );
}
