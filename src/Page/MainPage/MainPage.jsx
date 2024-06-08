import React from "react";
import "./MainPage.css";
import Header from "../../SideComponent/Header/Header";
import MainTop from "./MainTop";
import MainBoard from "./MainBoard";

function MainPage() {
  return (
    <>
      <Header />
      <MainTop />
      <MainBoard />
    </>
  );
}

export default MainPage;
