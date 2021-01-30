const express = require('express')
const ejs = require('ejs')
const mysql = require('mysql')
const app = express()
const Sequelize = require('sequelize');
 
app.set('ejs', ejs.renderFile)
 
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
  });
 
app.get('/', (req, res) => {
 
    con.query('select * from title', function (err, results, fields) {
        if (err) throw err
        res.render('index.ejs', { content: results })
    });
 
})
 
app.listen(3000, () => {
    console.log('server start')
})