import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../SideComponent/Header/AuthContext.jsx";
import MessageModal from '../../SideComponent/Modal/MessageModal.jsx';
import Modal from '../loginForm/Forgot/Modal/Modal';
import ForgotPassword from '../loginForm/Forgot/ForgotPassword';
import ForgotUsername from '../loginForm/Forgot/ForgotId'; 
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); 
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [navigateOnClose, setNavigateOnClose] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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

    try {
      const body = JSON.stringify({ email: formData.email, password: formData.password });
      const response = await fetch('http://43.202.192.54:8080/api/members/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body
      });

      const result = await response.json();
      console.log('로그인 성공:', result);
      
      if (result.success === "true") {
        localStorage.setItem("userToken", result.data.token);
        login({ name: result.data.nickname });
        console.log(result.data.token);
        setMessage(`${result.data.nickname}님 반갑습니다!`);
        setNavigateOnClose(true);
        setIsMessageModalOpen(true);
      } else {
        console.error("로그인 오류 : 400", result.msg);
        setMessage(result.msg);
        setNavigateOnClose(false);
        setIsMessageModalOpen(true);
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setMessage('로그인에 실패했습니다.');
      setNavigateOnClose(false);
      setIsMessageModalOpen(true);
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    setIsPasswordModalOpen(true);
  };

  const handleForgotUsername = () => {
    setIsUsernameModalOpen(true);
  };

  const closeModal = () => {
    setIsPasswordModalOpen(false);
    setIsUsernameModalOpen(false);
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    if (navigateOnClose) {
      navigate("/");
    }
  }

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
          <ForgotPassword onClose={closeModal} />
        </div>
      </Modal>

      {/* 아이디 찾기 모달 */}
      <Modal isOpen={isUsernameModalOpen} onClose={closeModal}>
        <div>
          <h3>아이디 찾기</h3>
          <ForgotUsername onClose={closeModal} />
        </div>
      </Modal>
      <MessageModal
        message={message}
        isOpen={isMessageModalOpen}
        onClose={closeMessageModal}
      />
    </div>
  );
};

export default LoginForm;
