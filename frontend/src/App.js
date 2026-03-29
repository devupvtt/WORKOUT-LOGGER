import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "./Auth";
import Chat from "./Chat";
import Analytics from "./Analytics";
import "./App.css";

// 🔥 LIVE BACKEND URL
const API = "https://workout-logger-kk3m.onrender.com";

function App() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [suggestion, setSuggestion] = useState("");

  const [form, setForm] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
    date: "",
  });

  // 🔄 GET WORKOUTS
  const fetchWorkouts = async () => {
    try {
      const res = await axios.get(`${API}/workouts`);
      setWorkouts(res.data);
    } catch (err) {
      console.error("GET ERROR:", err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // ➕ ADD WORKOUT
  const addWorkout = async () => {
    try {
      const payload = {
        ...form,
        sets: parseInt(form.sets),
        reps: parseInt(form.reps),
        weight: parseFloat(form.weight),
      };

      console.log("Sending:", payload);

      await axios.post(`${API}/workouts`, payload);

      alert("Workout added 💪");
      fetchWorkouts();

      setForm({
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
        date: "",
      });
    } catch (err) {
      console.error("POST ERROR:", err);
      alert("Error adding workout ❌");
    }
  };

  // 🤖 AI SUGGESTION
  const getSuggestion = async () => {
    try {
      const res = await axios.get(`${API}/ai/suggestions`);
      setSuggestion(res.data.suggestion || "No suggestion");
    } catch (err) {
      console.error("AI ERROR:", err);
      setSuggestion("AI not available ❌");
    }
  };

  // 🔐 AUTH SCREEN
  if (!user) {
    return <Auth setUser={setUser} />;
  }

  return (
    <div className="app">
      <h1>🔥 AI Workout Dashboard</h1>

      {/* ➕ ADD WORKOUT */}
      <div className="card">
        <h2>Add Workout</h2>

        <input
          placeholder="Exercise"
          value={form.exercise}
          onChange={(e) =>
            setForm({ ...form, exercise: e.target.value })
          }
        />

        <input
          placeholder="Sets"
          value={form.sets}
          onChange={(e) =>
            setForm({ ...form, sets: e.target.value })
          }
        />

        <input
          placeholder="Reps"
          value={form.reps}
          onChange={(e) =>
            setForm({ ...form, reps: e.target.value })
          }
        />

        <input
          placeholder="Weight"
          value={form.weight}
          onChange={(e) =>
            setForm({ ...form, weight: e.target.value })
          }
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <button onClick={addWorkout}>Add Workout</button>
      </div>

      {/* 📜 WORKOUT HISTORY */}
      <div className="card">
        <h2>Workout History</h2>

        {workouts.length === 0 ? (
          <p>No workouts yet</p>
        ) : (
          workouts.map((w) => (
            <div key={w.id} className="workout">
              {w.exercise} - {w.reps} reps ({w.weight} kg)
            </div>
          ))
        )}
      </div>

      {/* 🤖 AI COACH */}
      <div className="card">
        <h2>🤖 AI Coach</h2>
        <button onClick={getSuggestion}>Get Suggestion</button>
        <p>{suggestion}</p>
      </div>

      {/* 💬 CHAT */}
      <Chat />

      {/* 📊 ANALYTICS */}
      <Analytics workouts={workouts} />
    </div>
  );
}

export default App;