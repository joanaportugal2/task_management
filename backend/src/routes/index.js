const express = require("express");

const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");

let router = express.Router();

router.use((req, res, next) => {
  const start = Date.now();
  //compare a start time to an end time and figure out how many seconds elapsed
  res.on("finish", () => {
    // the finish event is emitted once the response has been sent to the client
    const diffSeconds = (Date.now() - start) / 1000;
    console.log(
      `${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`
    );
  });
  next();
});

router.route("/users").post(usersController.create);
router.route("/users/login").post(usersController.login);
router.route("/users/reset").patch(usersController.resetPassword);
router
  .route("/users/profile")
  .get(authController.verifyToken, usersController.getProfileData)
  .patch(authController.verifyToken, usersController.updateProfileData);

router.all("*", function (req, res) {
  res.status(404).json({ message: "What???" });
});

module.exports = router;
