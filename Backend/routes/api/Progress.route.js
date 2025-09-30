const router = require('express').Router();
const Progress = require('../../controller/Progress/progress')

router.use("/progress",Progress)

module.exports = router;