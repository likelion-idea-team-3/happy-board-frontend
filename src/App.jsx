import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from './components/SignupForm/SignupForm';
import MainPage from "./Page/MainPage/MainPage";

const App = () => {
    return (
<>
<Routes>
  <Route exact path="/" element={<MainPage />} />
  <Route path="/signup"element={<SignupForm />} />
</Routes>
</>
    );
};

export default App;