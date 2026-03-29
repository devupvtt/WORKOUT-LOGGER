import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "./Auth";
import Chat from "./Chat";
import Analytics from "./Analytics";
import "./App.css";

function App() {
  const API = "https://workout-logger-kk3m.onrender.com";

  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  const [form, setForm] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
    date: ""
  });

  const [suggestion, setSuggestion] = useState("");

  // 🔹 Fetch workouts
  const fetchWorkouts = async () => {
    try {
      const res = await axios.get(`${API}/workouts`);
      setWorkouts(res.data);
    } catch (err) {
      console.log("GET ERROR:", err);
    }
  };

  useEffect(() => {
    if (user) fetchWorkouts();
  }, [user]);

  // 🔹 Add workout
  const addWorkout = async () => {
    try {
      await axios.post(`${API}/workouts`, form);

      alert("Workout Added 💪");
      fetchWorkouts();

      setForm({
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
        date: ""
      });

    } catch (err) {
      console.log(err);
      alert("Error adding workout ❌");
    }
  };

  // 🔹 AI suggestion
  const getSuggestion = async () => {
    try {
      const res = await axios.get(`${API}/ai/suggestions`);
      setSuggestion(res.data.suggestion);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return <Auth setUser={setUser} />;
  }

  return (
    <div className="container">

      <h1>🔥 AI Workout Dashboard</h1>

      {/* 🏋️ Add Workout */}
      <div className="card">
        <h2>Add Workout</h2>

        <input
          placeholder="Exercise"
          value={form.exercise}
          onChange={e => setForm({ ...form, exercise: e.target.value })}
        />

        <input
          placeholder="Sets"
          value={form.sets}
          onChange={e => setForm({ ...form, sets: e.target.value })}
        />

        <input
          placeholder="Reps"
          value={form.reps}
          onChange={e => setForm({ ...form, reps: e.target.value })}
        />

        <input
          placeholder="Weight"
          value={form.weight}
          onChange={e => setForm({ ...form, weight: e.target.value })}
        />

        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />

        <button onClick={addWorkout}>Add Workout</button>
      </div>

      {/* 📜 Workout History */}
      <div className="card">
        <h2>Workout History</h2>

        {workouts.length === 0 ? (
          <p>No workouts yet</p>
        ) : (
          workouts.map(w => (
            <div key={w.id} className="workout">
              {w.exercise} - {w.sets}x{w.reps} ({w.weight}kg)
            </div>
          ))
        )}
      </div>

      {/* 📊 Analytics */}
      <div className="card">
        <Analytics workouts={workouts} />
      </div>

      {/* 🤖 AI Suggestion */}
      <div className="card">
        <h2>🤖 AI Coach</h2>
        <button onClick={getSuggestion}>Get Suggestion</button>
        <p>{suggestion}</p>
      </div>

      {/* 💬 AI Chat */}
      <div className="card">
        <Chat />
      </div>

    </div>
  );
}

export default App;