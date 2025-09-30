const express = require('express');
const router = express.Router();
const Workout = require('../../models/workout.model')

// Helper: Format date based on timeframe
const formatDate = (date, timeframe) => {
  date = new Date(date);
  switch(timeframe) {
    case 'week':
      return `Week ${getWeekNumber(date)}`;
    case 'month':
      return date.toLocaleString('default', { month: 'short' });
    case 'year':
      return date.getFullYear();
    default:
      return date.toISOString().split('T')[0];
  }
};

// Helper: Get week number
const getWeekNumber = (date) => {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstDay.getDay() + 1) / 7);
};

// Progress tracking endpoint
router.get('/', async (req, res) => {
  try {
    const { exercise, timeframe = 'week', startDate, endDate } = req.query;
    
    // Validate inputs
    if (!exercise) {
      return res.status(400).json({ 
        success: false,
        message: "Exercise name is required" 
      });
    }

    // Build query
    const query = { 
      'exercises.name': exercise 
    };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Fetch workouts with the selected exercise
    const workouts = await Workout.find(query)
      .sort({ date: 1 });

    // Aggregate progress data
    const progressData = workouts.map(workout => {
      const exerciseData = workout.exercises.find(ex => ex.name === exercise);
      return {
        date: formatDate(workout.date, timeframe),
        weight: exerciseData.weight,
        reps: exerciseData.reps,
        volume: exerciseData.weight * exerciseData.reps * exerciseData.sets
      };
    });

    // Calculate statistics
    const stats = {
      totalWorkouts: progressData.length,
      currentMax: Math.max(...progressData.map(d => d.weight)),
      averageReps: (progressData.reduce((sum, d) => sum + d.reps, 0) / progressData.length)
    };

    res.json({
      success: true,
      progressData,
      stats
    });

  } catch (error) {
    console.error("Progress tracking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch progress data"
    });
  }
});

module.exports = router;