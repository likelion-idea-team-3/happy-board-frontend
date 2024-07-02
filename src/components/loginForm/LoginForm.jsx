import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../loginForm/Forgot/Modal/Modal'; // 모달 컴포넌트 import
import ForgotPassword from '../loginForm/Forgot/ForgotPassword'; // 아이디 찾기 컴포넌트 import
import ForgotUsername from '../loginForm/Forgot/ForgotId'; // 비밀번호 찾기 컴포넌트 import
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // 비밀번호 찾기 모달 열림 상태 추가
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false); // 아이디 찾기 모달 열림 상태 추가
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 백엔드 API 요청 (백엔드 팀이 준비한 API 사용)
    try {
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('로그인에 실패했습니다.');
      }

      const result = await response.json();
      console.log('로그인 성공:', result);

      // 성공 시 추가 작업 (예: 리디렉션)
    } catch (error) {
      setError(error.message);
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    // 비밀번호 찾기 모달 열기
    setIsPasswordModalOpen(true);
  };

  const handleForgotUsername = () => {
    // 아이디 찾기 모달 열기
    setIsUsernameModalOpen(true);
  };

  const closeModal = () => {
    // 모달 닫기 함수
    setIsPasswordModalOpen(false);
    setIsUsernameModalOpen(false);
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="tabs">
          <button type="button" onClick={navigateToSignup}>회원가입</button>
          <button type="button" className="active"><h3>로그인</h3></button>
        </div>
        <hr className="login-hr" />
        <h3>이메일로 로그인</h3>
        <hr className="login-hr" />
        {error && <div className="error">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="forgot-links">
          <button type="button" className="forgot-btn" onClick={handleForgotPassword}>비밀번호 찾기</button>
          <button type="button" className="forgot-btn" onClick={handleForgotUsername}>아이디 찾기</button>
        </div>
        <button type="submit" className="login-btn">이메일로 로그인하기</button>
      </form>

      {/* 비밀번호 찾기 모달 */}
      <Modal isOpen={isPasswordModalOpen} onClose={closeModal}>
        <div>
          <h3>비밀번호 찾기</h3>
          {/* 비밀번호 찾기 컴포넌트 */}
          <ForgotPassword onClose={closeModal} />
        </div>
      </Modal>

      {/* 아이디 찾기 모달 */}
      <Modal isOpen={isUsernameModalOpen} onClose={closeModal}>
        <div>
          <h3>아이디 찾기</h3>
          {/* 아이디 찾기 컴포넌트 */}
          <ForgotUsername onClose={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;
