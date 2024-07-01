import React, { useState } from "react";
import { useAuth } from "../../SideComponent/Header/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/members/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.success) {
                login({ email, name: data.data.name });
                localStorage.setItem("userToken", data.data.token);
                navigate("/");
            } else {
                console.error("로그인 오류:", data.message);
            }
        } catch (error) {
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
                        required
                    />
                </label>
                <br />
                <label>
                    비밀번호:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
