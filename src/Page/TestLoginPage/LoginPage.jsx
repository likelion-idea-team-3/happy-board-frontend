import React, { useState } from "react";
import { useAuth } from "../../SideComponent/Header/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(`${email}`, `${password}`);

        try {
            const body = JSON.stringify({ email, password });
            console.log("Request Body:", body);

            const response = await fetch(
                "http://43.202.192.54:8080/api/members/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: body,
                }
            );

            const result = await response.json();
            console.log(result);

            if (result.success === "true") {
                console.log("성공");
                localStorage.setItem("userToken", result.data.token);
                login({ name: result.data.nickname });
                navigate("/");
            } else {
                console.error("로그인 오류 : 400", result.success);
            }
        } catch (error) {
            console.log("실패");
            console.error("로그인 오류:", error);
        }
    };

    return (
        <div style={{ margin: "200px" }}>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <label>
                    이메일:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    비밀번호:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">로그인</button>
                <button
                    onClick={() => {
                        navigate("/signup1");
                    }}
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
