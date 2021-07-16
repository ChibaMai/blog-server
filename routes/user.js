var express = require('express');
var router = express.Router();
var pool = require('../pool');

router.get('/test', function (req, res, next) {
  res.send({
    code: 200,
    message: 'ok'
  })
});

router.post('/UserQuery', function (req, res, next) {
  let obj = req.body;

  pool.query('SELECT * FROM user WHERE name=? AND password=?', [obj.name, obj.password], function (err, result) {
    if (err) throw err;

    if (result.length > 0) {
      query()
    } else {
      res.send({
        code: 400,
        message: 'The user name or password is wrong, please enter it again.',
      });
    }

    function query() {
      pool.query('UPDATE user SET status=? WHERE id=?', [obj.status, result[0].id], function (err, results) {
        if (err) throw err;

        if (results.affectedRows > 0) {
          res.send({
            code: 200,
            message: 'login successful.',
            id: result[0].id,
            status: 1,
          });
        } else {
          res.send({
            code: 400,
            message: 'The user name or password is wrong, please enter it again.',
          });
        }

      });
    }

  });
});

router.get('/out', (req, res, next) => {
  let obj = req.query;

  pool.query('UPDATE user SET status=? WHERE id=?', [obj.status, obj.id], function (err, results) {
    if (err) throw err;

    pool.query('SELECT * FROM user WHERE id=?', [obj.id], function (err, result) {
      if (result.affectedRows > 0) {
        res.send({
          code: 400,
          message: 'The user name or password is wrong, please enter it again.',
        });
      } else {
        res.send({
          code: 200,
          message: 'Sign out successfully.',
          id: result[0].id,
          status: result[0].status,
        });
      }

    });
  });
});

module.exports = router;
