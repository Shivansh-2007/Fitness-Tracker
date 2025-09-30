const express = require('express');
const router = express.Router();
const Workout = require('../../models/workout.model');

// Helper: Calculate workout streak
const calculateStreak = (workouts) => {
  if (!workouts.length) return 0;
  
  const sorted = [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date));
  let streak = 0;
  let currentDate = new Date();
  
  // Check consecutive workout days
  while (true) {
    const hasWorkout = sorted.some(w => 
      new Date(w.date).toDateString() === currentDate.toDateString()
    );
    
    if (hasWorkout) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};

// Helper: Count workouts in the last 7 days
const calculateWeeklyWorkouts = (workouts) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return workouts.filter(w => new Date(w.date) >= oneWeekAgo).length;
};

router.post('/', async (req, res) => {
    try {
        if (!req.body.name || !req.body.date || !req.body.exercises) {
            return res.status(400).json({ 
                success: false,
                message: "Missing required fields: name, date, or exercises" 
            });
        }

        const newWorkout = new Workout({
            name: req.body.name,
            date: new Date(req.body.date),
            exercises: req.body.exercises.map(exercise => ({
                name: exercise.name,
                sets: exercise.sets,
                reps: exercise.reps,
                weight: exercise.weight
            }))
        });

        const savedWorkout = await newWorkout.save();

        res.status(201).json({
            success: true,
            message: "Workout saved successfully",
            workout: {
                id: savedWorkout._id,
                name: savedWorkout.name,
                date: savedWorkout.date.toISOString().split('T')[0],
                exercises: savedWorkout.exercises
            }
        });

    } catch (error) {
        console.error("Error in logWorkout:", error);
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});


router.get('/recent', async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ date: -1 }).limit(2);
        res.json({
            success: true,
            workouts: workouts.map(w => ({
                id: w._id,
                name: w.name,
                date: w.date.toISOString().split('T')[0],
                exercises: w.exercises
            })),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch workouts"
        });
    }
});
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ date: -1 });
        const stats  ={
            streak: calculateStreak(workouts),
            weeklyWorkouts: calculateWeeklyWorkouts(workouts)
        }
        res.json({
            success: true,
            workouts: workouts.map(w => ({
                id: w._id,
                name: w.name,   
                date: w.date.toISOString().split('T')[0],
                exercises: w.exercises
            })),
            stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch workouts"
        });
    }
});

module.exports = router;