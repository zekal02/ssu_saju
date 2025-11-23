// lib/users.js

// 서버 메모리에 유저를 저장하는 "가짜 DB"
// 개발용/과제용으로만 사용 (새로고침/서버 재시작하면 날아감)

const users = []; // { id, email, password }

export function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

export function createUser(email, password) {
  const exists = findUserByEmail(email);
  if (exists) {
    const error = new Error('USER_EXISTS');
    error.code = 'USER_EXISTS';
    throw error;
  }

  const newUser = {
    id: Date.now(),
    email,
    password, // 실제 서비스라면 bcrypt 등으로 해시해야 함!
  };
  users.push(newUser);
  return newUser;
}

export function validateUser(email, password) {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
}
