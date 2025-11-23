// pages/api/auth/login.js
import { validateUser } from '../../../lib/users';

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

  const user = validateUser(email, password);

  if (!user) {
    return res
      .status(401)
      .json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
  }

  // 연습용: 토큰/쿠키 없이 그냥 성공만 알려줌
  return res.status(200).json({
    message: '로그인 성공',
    user: { id: user.id, email: user.email },
  });
}
