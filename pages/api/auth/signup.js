// pages/api/auth/signup.js
import { createUser } from '../../../lib/users';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST 메서드만 지원합니다.' });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: '이메일과 비밀번호를 모두 입력해주세요.' });
  }

  try {
    const user = createUser(email, password);
    return res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    if (err.code === 'USER_EXISTS') {
      return res.status(409).json({ error: '이미 존재하는 이메일입니다.' });
    }
    console.error(err);
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}
