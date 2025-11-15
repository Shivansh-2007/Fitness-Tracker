import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import DashboardNavbar from '../Components/DashboardNavbar';
import axios from 'axios';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState({
    streak: 0,
    weeklyWorkouts: 0
  });

  useEffect(() => {
    const fetchExercises = async () => {
      try{
        const response = await axios.get("http://localhost:5001/api/Workouts/logWorkouts/recent");
        setWorkouts(response.data.workouts);
        const answer = await axios.get("http://localhost:5001/api/Workouts/logWorkouts");
        setStats(answer.data.stats);
      } catch (err) {
        console.error("Error fetching Exercises:", err)
      }
    };
      fetchExercises();
  }, []);

  return (
    <div>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Your Fitness Dashboard</h1>
          <p>Track your workouts and progress</p>
        </header>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Current Streak</h3>
            <p>{stats.streak} days {stats.streak > 0 && '🔥'}</p>
          </div>
          <div className="stat-card">
            <h3>Workouts This Week</h3>
            <p>{stats.weeklyWorkouts} sessions</p>
          </div>
        </div>

        <section className="recent-workouts">
          <div className="section-header">
            <h2>Recent Workouts</h2>
            <Link to="/workouts" className="view-all">View All</Link>
          </div>
          
          {workouts.length > 0 ? (
            <div className="workout-list">
              {workouts.map(workout => (
                <div key={workout.id} className="workout-card">
                  <h3>{workout.name}</h3>
                  <p className="workout-date">{new Date(workout.date).toLocaleDateString()}</p>
                  <ul className="exercise-list">
                    {workout.exercises.map((exercise, index) => (
                      <li key={index}>
                        <span className="exercise-name">{exercise.name}</span>
                        <span>{exercise.sets}x{exercise.reps} @ {exercise.weight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-workouts">No workouts logged yet</p>
          )}
        </section>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <Link to="/log-workout" className="cta-button primary">
            + Log New Workout
          </Link>
          <Link to="/progress" className="cta-button secondary">
            View Full Progress
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;