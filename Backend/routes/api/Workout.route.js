const router = require('express').Router();
const logWorkout = require("../../controller/Workouts/logWorkouts")

router.use("/logWorkouts",logWorkout)

module.exports = router;