// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/signupForm/SignupForm';
import LoginForm from './components/loginForm/LoginForm';
import ForgotPassword from './components/loginForm/Forgot/ForgotPassword'; 
import TermsOfService from './components/WebInfo/TermsOfService'; 
import PrivacyPolicy from './components/WebInfo/PrivacyPolicy'; 
import PromotionInfo from './components/WebInfo/PromotionInfo';
import ForgotId from './components/loginForm/Forgot/ForgotId' 


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* 기본 경로는 회원가입 페이지로 리디렉션 */}
          <Route path="/" element={<SignupForm />} />
          {/* 예시로 추가된 terms 페이지 */}
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/promotion" element={<PromotionInfo />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-id" element={<ForgotId />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
