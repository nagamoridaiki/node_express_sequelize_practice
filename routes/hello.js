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
      res.render('hello/index', data);
    }  
  });
});

router.get('/add', (req, res, next) => {
  var data = {
      title: 'Hello/Add',
      content: '新しいレコードを入力：'
  }
  res.render('hello/add', data);
});

router.post('/add', (req, res, next) => {
  const nm = req.body.name;
  const ml = req.body.mail;
  const ag = req.body.age;
  db.query('insert into mydata (name, mail, age) values (?, ?, ?)',[nm, ml, ag], function (err, rows) {
    if (!err) {
      console.log(err);
      var data = {
        title: 'Hello!',
        content: rows // 取得したレコードデータ
      };
      res.render('hello/index', data);
    }  
  });
  res.redirect('/hello');
});

router.get('/show', (req, res, next) => {
  const id = req.query.id;
  db.query('select * from mydata where id = ?',[id], function (err, rows) {
    if (!err) {
      var data = {
        title: 'Hello/show',
        content: 'id = ' + id + ' のレコード：',
        mydata: rows[0]
      }
      res.render('hello/show', data);
    }
  });
});

router.get('/edit', (req, res, next) => {
  const id = req.query.id;
  db.query("select * from mydata where id = ?",[id], function (err, rows) {
    if (!err) {
      var data = {
        title: 'Hello/edit',
        content: 'id = ' + id + ' のレコード：',
        mydata: rows[0]
      }
      res.render('hello/edit', data);
    }
  });
});

router.post('/edit', (req, res, next) => {
  const id = req.body.id;
  const nm = req.body.name;
  const ml = req.body.mail;
  const ag = req.body.age;

  db.query("update mydata set name = ?, mail = ?, age = ? where id = ?",
  [nm, ml, ag, id], 
  function (err, rows) {
    if (!err) {
      var data = {
        title: 'Hello/edit',
        content: 'id = ' + id + ' のレコード：',
        mydata: rows[0]
      }
      res.render('hello/edit', data);
    }
  });
  res.redirect('/hello');
});


router.get('/delete', (req, res, next) => {
  const id = req.query.id;
  db.query('select * from mydata where id = ?',[id], function (err, rows) {
    if (!err) {
      var data = {
        title: 'Hello/Delete',
        content: 'id = ' + id + ' のレコードを削除：',
        mydata: rows[0]
      }
      res.render('hello/delete', data);
    }
  });

});

router.post('/delete', (req, res, next) => {
  const id = req.body.id;


  db.serialize(() => {
    const q = "delete from mydata where id = ?";
    db.run(q, id);
  });
  res.redirect('/hello');


  db.query('delete from mydata where id = ?',[id], function (err) {
    if (!err) {
      res.render('hello/index');
    }
  });

});

module.exports = router;
