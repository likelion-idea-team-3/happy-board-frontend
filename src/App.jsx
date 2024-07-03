import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import SignupForm from './components/SignupForm/SignupForm';
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
import WriteArticle from "./Page/PostBoard/WriteArticle";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <>
            <ScrollToTop />
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
                <Route path="/edit/:id" element={<EditArticle />} />
                <Route path="/write" element={<WriteArticle />} />
                <Route path="*" element={<NonePage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
