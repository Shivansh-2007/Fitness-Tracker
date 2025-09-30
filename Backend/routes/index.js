// first part of segment

const router = require('express').Router();
const apiRoutes = require('./api/index')

router.use("/api",apiRoutes)
router.use("/api",(req, res , next) => {
    next(
        res.status(404).json({
            message: "Route not found"
        })
    );
}
)

module.exports = router;