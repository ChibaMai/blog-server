var express = require('express');
var router = express.Router();
var pool = require('./../pool');

// 新增
router.post('/insert', function (req, res, next) {
  var obj = req.body.params;

  // 判断是否为空
  for (const key in obj) {
    if (obj[key] !== undefined) {
      // console.log('ok');
    } else {
      res.send({
        code: 400,
        message: 'List item cannot be empty.'
      })
    }
  }

  pool.query('INSERT INTO article SET ?', [obj], (err, result) => {
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
  })

});

// 删除
router.post('/delete', function (req, res, next) {
  let id = Number(req.body.params);

  pool.query('DELETE FROM article WHERE id = ?', [id], (err, result) => {
    if (err) throw err;

    if(result.affectedRows > 0){
      res.send({
        code: 200,
        msg: '删除成功'
      });
    }else{
      res.send({
        code: 201,
        message: '删除失败'
      });
    }

  });

});

// 更新
router.get('/update', function (req, res, next) {

  res.send({
    "message": "ok"
  });

});

// 查询
router.get('/inquire', function (req, res, next) {

  pool.query('SELECT * FROM article', (err, result) => {
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

// Single query
router.post('/SingleQuery', (req, res, next) => {
  let uid = req.body.params;

  if (uid === undefined) {
    res.send({
      code: 404,
      message: 'The id value is not recognized'
    })
  } else {
    pool.query('SELECT * FROM article WHERE id = ?', [uid], (err, result) => {
      if (err) throw err;

      if (result.affectedRows > 0) {
        res.send({
          code: 201,
          message: 'Data query failed'
        })
      } else {
        res.send({
          code: 200,
          message: 'Data query is successful',
          data: result
        })
      }

    });
  }

});

module.exports = router;
