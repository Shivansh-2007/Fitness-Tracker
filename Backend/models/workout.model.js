const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true, min: 1 },
  reps: { type: Number, required: true, min: 1 },
  weight: { type: String, required: true }
});

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  exercises: [ExerciseSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', WorkoutSchema);