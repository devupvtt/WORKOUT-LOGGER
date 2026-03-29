import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Auth({ setUser }) {
  const API = "http://127.0.0.1:5000";

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(`${API}/login`, form);
        alert(res.data.msg);
        setUser(form.username);
      } else {
        const res = await axios.post(`${API}/signup`, form);
        alert(res.data.msg);
        setIsLogin(true);
      }
    } catch (err) {
      alert("Error ❌");
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>{isLogin ? "🔐 Login" : "🚀 Signup"}</h2>

        <input
          placeholder="Username"
          onChange={(e) => setForm({...form, username: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={handleSubmit}>
            {isLogin ? "Login" : "Signup"}
          </button>
        )}

        <p onClick={() => setIsLogin(!isLogin)} style={{cursor:"pointer"}}>
          {isLogin ? "New user? Signup" : "Already have account? Login"}
        </p>

      </div>
    </div>
  );
}

export default Auth;