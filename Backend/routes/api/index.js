const router = require('express').Router();
const authRoutes = require('./Auth.route')
const workoutRoutes = require('./Workout.route')
const progressRoutes = require('./Progress.route')

router.use("/auth",authRoutes)
router.use("/Workouts",workoutRoutes)
router.use("/progress",progressRoutes)

module.exports = router;
