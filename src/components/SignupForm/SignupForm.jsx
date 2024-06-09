import React, { useState } from 'react';
import './SignupForm.css';

const SignupForm = () => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrorMessage('');

        try {
            const response = await fetch('백엔드 주소', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, nickname, email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || '회원가입 실패');
                return;
            }

            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            alert('회원가입 성공');
            window.location.href = '/login.html';
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('서버 오류. 나중에 다시 시도해주세요.');
        }
    };

    return (
        <div className="signup-form">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    id="nickname"
                    placeholder="닉네임"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                />
                <input
                    type="email"
                    id="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">회원가입</button>
                {errorMessage && <div className="error">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default SignupForm;
