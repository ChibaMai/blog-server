var express = require('express');
var router = express.Router();
var pool = require('./../pool');

router.get('/inster', function (req, res, next) {
  let obj = req.query;

  pool.query('INSERT INTO test SET ?', [obj], (err, result) => {
    if (err) throw err;

    if (result.affectedRows > 0) {
      res.send({
        code: 200,
        message: 'Data inserted successfully',
      });
    } else {
      res.send({
        code: 400,
        message: 'Failed to insert the data, please rewrite the data',
      });
    }
  });

});

router.get('/select', (req, res, next) => {

  pool.query('select * from test', (err, result) => {
    if (err) throw err;

    if (result.affectedRows > 0) {
      res.send({
        code: 201,
        message: 'no data has been found.'
      })
    } else {
      res.send({
        code: 200,
        message: 'Data query is successful',
        data: result
      })
    }
  });

});

module.exports = router;
