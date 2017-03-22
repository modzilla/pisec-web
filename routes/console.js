var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('console',{
    title: "PiSEC Console View",
    consoles : [
        "Port0",
        "Port1",
        "Port2",
        "Port3"
    ]
  });
});

module.exports = router;
