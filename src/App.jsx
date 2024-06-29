import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm/SignupForm";
import MainPage from "./Page/MainPage/MainPage";
import Header from "./SideComponent/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </>
  );
}

export default App;
