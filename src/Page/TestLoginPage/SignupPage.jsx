import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/members/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, nickname }),
      });
      if (response.ok) {
        navigate('/login');
      } else {
        console.error('회원가입 오류:', response.statusText);
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <div style={{ margin: "200px" }} >
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <label>
          이메일:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <label>
          이름:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          닉네임:
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
        </label>
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignupPage;
