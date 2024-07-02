import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import SignupForm from './components/signupForm/SignupForm';
import MainPage from "./Page/MainPage/MainPage";
import LoginForm from './components/loginForm/LoginForm';
import Header from "./SideComponent/Header/Header";
import Footer from "./SideComponent/Footer/Footer";
import NonePage from "./Page/NonePage/NonePage";
import DetailPost from "./Page/DetailPostPage/DetailPost";
import MoreNews from "./Page/MorePage/MoreNews";
import SignupPage from "./Page/TestLoginPage/SignupPage";
import MainPostBoard from "./Page/PostBoard/MainPostBoard";
import EditArticle from "./Page/PostBoard/EditArticle";
import Mypage from "./Page/Mypage/Mypage";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/more" element={<MoreNews />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup1" element={<SignupPage />} />
                <Route path="/post" element={<MainPostBoard />} />
                <Route path="/post/:postId" element={<DetailPost />} />
                <Route path="/mypost" element={<Mypage />} />
                <Route path="/edit" element={<EditArticle />} />
                <Route path="*" element={<NonePage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
