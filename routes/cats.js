var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.render("cats", { name: "White Cat", age: 8 });
});

module.exports = router;
