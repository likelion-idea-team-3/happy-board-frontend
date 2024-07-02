import React, { useEffect } from "react";
import "./MainPage.css";

import Header from "../../SideComponent/Header/Header.jsx";

import MainTop from "./MainTop";
import MainBoard from "./MainBoard";
import MainSection from "./MainSection";

function MainPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <MainTop />
            <MainBoard />
            <MainSection />
        </>
    );
}

export default MainPage;
