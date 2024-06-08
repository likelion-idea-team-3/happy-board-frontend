import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Page/MainPage/MainPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
