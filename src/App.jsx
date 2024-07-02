import "./App.css";
import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import SignupForm from "./components/SignupForm/SignupForm";
import MainPage from "./Page/MainPage/MainPage";
import Header from "./SideComponent/Header/Header";
import Footer from "./SideComponent/Footer/Footer";
import NonePage from "./Page/NonePage/NonePage";
import DetailPost from "./Page/DetailPostPage/DetailPost";
import MoreNews from "./Page/MorePage/MoreNews";
import LoginPage from "./Page/TestLoginPage/LoginPage";
import SignupPage from "./Page/TestLoginPage/SignupPage";
import MainPostBoard from "./Page/PostBoard/MainPostBoard";
import EditArticle from "./Page/PostBoard/EditArticle";
import Mypage from "./Page/Mypage/Mypage";

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
                <Route path="/login" element={<LoginPage />} />
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
