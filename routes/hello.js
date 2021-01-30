const express = require('express');
const router = express.Router();

const mysql = require('mysql')

// データベースオブジェクトの取得
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
  });

// GETアクセスの処理
router.get('/',(req, res, next) => {
  db.query('select * from mydata', function (err, rows) {
    if (!err) {
      console.log(err);
      var data = {
        title: 'Hello!',
        content: rows // 取得したレコードデータ
      };
      res.render('hello', data);
    }  
  });
  
});

module.exports = router;
