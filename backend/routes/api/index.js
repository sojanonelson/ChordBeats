const router = require('express').Router()

const userRoutes = require("./user")
const instrumentRoutes = require("./instrument")

router.use("/user", userRoutes);
router.use('/instrument', instrumentRoutes)
module.exports = router