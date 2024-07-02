import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from './components/signupForm/SignupForm';
import MainPage from "./Page/MainPage/MainPage";
import LoginForm from './components/loginForm/LoginForm'

const App = () => {
    return (
<>
<Routes>
  <Route exact path="/" element={<MainPage />} />
  <Route path="/signup"element={<SignupForm />} />
  <Route path="/login" element={<LoginForm />} />
</Routes>
</>
    );
};

export default App;