import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import './SignupForm.css';

Modal.setAppElement('#root');

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreePrivacy: false,
    isOver14: false,
    receivePromotions: false,
  });
  const [error, setError] = useState('');
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false); // Promotion modal state
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false); // Privacy modal state
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false); // Terms modal state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('로그인, 비밀번호를 입력해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!formData.agreeTerms || !formData.agreePrivacy || !formData.isOver14) {
      setError('필수 항목에 동의해야 합니다.');
      return;
    }

    try {
      const response = await fetch('https://api.example.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }

      const result = await response.json();
      console.log('회원가입 성공:', result);
    } catch (error) {
      setError(error.message);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const togglePromoModal = () => {
    setIsPromoModalOpen(!isPromoModalOpen);
  };

  const togglePrivacyModal = () => {
    setIsPrivacyModalOpen(!isPrivacyModalOpen);
  };

  const toggleTermsModal = () => {
    setIsTermsModalOpen(!isTermsModalOpen);
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="tabs">
          <button type="button" className="active">회원가입</button>
          <button type="button" onClick={navigateToLogin}>로그인</button>
        </div>
        <h3>이메일로 가입하기</h3>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit" className="signup-btn">회원가입</button>
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="agreeAll"
              onChange={(e) => {
                const checked = e.target.checked;
                setFormData({
                  ...formData,
                  agreeTerms: checked,
                  agreePrivacy: checked,
                  isOver14: checked,
                  receivePromotions: checked,
                });
              }}
            />
            <span>전체 동의하기</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <Link to="#" className="red-underline" onClick={toggleTermsModal}>이용약관</Link>동의(필수)
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="agreePrivacy"
              checked={formData.agreePrivacy}
              onChange={handleChange}
            />
            <span>
              <Link to="#" className="red-underline" onClick={togglePrivacyModal}>개인정보 수집 및 이용</Link>동의(필수)
            </span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="isOver14"
              checked={formData.isOver14}
              onChange={handleChange}
            />
            <span>만 14세 이상(필수)</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="receivePromotions"
              checked={formData.receivePromotions}
              onChange={handleChange}
            />
            <span>
              <Link to="#" className="red-underline" onClick={togglePromoModal}>혜택정보 알림 수신 동의</Link>
              <span className="optional">(선택)</span>
            </span>
          </label>
        </div>
      </form>

      {/* Promotion Modal */}
      <Modal
        isOpen={isPromoModalOpen}
        onRequestClose={togglePromoModal}
        contentLabel="혜택 정보 알림 수신 동의"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>혜택 정보 알림 수신 동의 (선택)</h2>
          <p>@@@에서 제공하는 이벤트 및 서비스(제휴 서비스 포함) 안내 등 광고성 정보를 받으시려면 혜택 정보 이용에 동의하여 주시기 바랍니다.</p>
          <table className="modal-table">
            <thead>
              <tr>
                <th>선택 정보 수집 항목</th>
                <th>목적</th>
                <th>보유 및 이용기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>이메일, 휴대폰 번호</td>
                <td>이벤트 혜택 및 정보 전송</td>
                <td>목적 달성 후 즉시 파기, 관련 법령에서 별도의 보관기간을 정한 경우 해당 시점까지 보관</td>
              </tr>
            </tbody>
          </table>
          <p>동의를 거부할 권리가 있으며, 혜택 등의 여부와 관계 없이 회원가입을 할 수 있습니다. 다만, 동의 거부 시 상기 목적에 명시된 서비스를 제공받으실 수 없습니다.</p>
          <button className="close-btn" onClick={togglePromoModal}>닫기</button>
        </div>
      </Modal>

      {/* Privacy Modal */}
      <Modal
        isOpen={isPrivacyModalOpen}
        onRequestClose={togglePrivacyModal}
        contentLabel="개인정보 수집 및 이용 동의"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>개인정보 수집 및 이용 동의</h2>
          <p>㈜@@@은 다음과 같이 개인 정보를 수집 및 이용하고 있습니다.</p>
          <h3>[필수] 개인 정보 수집 및 이용 동의</h3>
          <ul>
            <li><b>1. 개인 정보 수집/이용 목적:</b> @@@ 회원제 서비스 제공</li>
            <li><b>2. 수집하는 항목:</b> 휴대폰 번호(휴대폰으로 회원 가입 시), 이메일(이메일로 회원 가입 시), 비밀번호</li>
            <li><b>3. 보유 및 이용 기간:</b> 회원 탈퇴 후 지체 없이 삭제(법령에 특별한 규정이 있을 경우 관련 법령에 따름)</li>
          </ul>
          <p>서비스 이용과정에서 기기 정보, IP 주소, 쿠키, 서비스 이용 기록이 자동으로 수집될 수 있습니다.</p>
          <p>동의를 거부하실 경우 서비스 이용이 불가능합니다.</p>
          <button className="close-btn" onClick={togglePrivacyModal}>닫기</button>
        </div>
      </Modal>

      {/* Terms Modal */}
      <Modal
        isOpen={isTermsModalOpen}
        onRequestClose={toggleTermsModal}
        contentLabel="이용약관 동의"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>이용약관 동의</h2>
          <p>서비스 이용을 위한 이용약관을 확인하시고 동의해 주세요.</p>
          <ul>
            <li><b>1. 이용약관 목적:</b> 서비스 이용 조건 및 절차 명시</li>
            <li><b>2. 주요 내용:</b> 계정 생성, 서비스 사용, 권리 및 의무 등</li>
            <li><b>3. 준수 사항:</b> 타인의 권리 침해 금지, 허위 정보 제공 금지 등</li>
          </ul>
          <p>이용약관에 동의하지 않으시면 서비스 이용이 불가능합니다.</p>
          <button className="close-btn" onClick={toggleTermsModal}>닫기</button>
        </div>
      </Modal>
    </div>
  );
};

export default SignupForm;
