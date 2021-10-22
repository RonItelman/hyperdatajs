var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HyperData JS' });
});

router.get('/problems/health/medical', function(req, res, next) {
  res.render('schema', { title: 'HyperData JS' });
});

module.exports = router;
