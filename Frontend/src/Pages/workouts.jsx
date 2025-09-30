import React, { useState, useEffect } from 'react';
import DashboardNavbar from '../Components/DashboardNavbar';
import axios from 'axios';

const Workouts = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:5001/api/Workouts/logWorkouts");
                setWorkouts(response.data.workouts);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching workouts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkouts();
    }, []); 

    if (loading) return <div>Loading workouts...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <DashboardNavbar/>
            <h2 style={{display: 'flex', justifyContent: 'center'}}>All Your Workouts</h2>
            {workouts.length > 0 ? (
                <ul>
                    {workouts.map(workout => (
                        <li key={workout.id}>
                            <h3>{workout.name}</h3>
                            <p>Date: {workout.date}</p>
                            <ul>
                                {workout.exercises.map((exercise, index) => (
                                    <li key={index}>
                                        {exercise.name} - {exercise.sets}x{exercise.reps} @ {exercise.weight}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No workouts found</p>
            )}
        </div>
    );
};

export default Workouts;    