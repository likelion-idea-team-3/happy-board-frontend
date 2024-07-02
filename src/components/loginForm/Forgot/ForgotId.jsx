import React, { useState } from 'react';
import Modal from './Modal/Modal';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 여기서는 예시로 console에 출력하는 것으로 대체합니다.
      // 실제로는 서버로 이메일을 전송하고, 해당 이메일에 대한 정보를 확인해야 합니다.
      console.log(`이메일 "${email}"을 사용하여 아이디를 찾습니다.`);
      setMessage(`"${email}"로 등록된 아이디가 있는지 확인 중입니다.`);
      setIsModalOpen(true); // 모달 열기
    } catch (error) {
      console.error('아이디 찾기 중 오류 발생:', error);
      setMessage('아이디를 찾는 도중 오류가 발생했습니다.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose(); // 부모 컴포넌트에서 전달받은 닫기 함수 호출
  };

  return (
    <div>
      <h2>아이디</h2>
      <form onSubmit={handleSubmit}>
        <label>
          이메일:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <button type="submit">아이디 찾기</button>
      </form>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h3>아이디 찾기 결과</h3>
          <p>{message}</p>
          <button onClick={closeModal}>닫기</button>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
