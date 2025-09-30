const router = require('express').Router();
const login = require("../../controller/Auth/login")
const register = require("../../controller/Auth/register")
const usersController = require("../../controller/Auth/getusers.controller")

router.use("/login",login)
router.use("/register",register)
router.get("/users", usersController)
// router.use("/register",authRoutes)

module.exports = router;