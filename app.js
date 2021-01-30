const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express')
const ejs = require('ejs')
const mysql = require('mysql')
const app = express()
const Sequelize = require('sequelize');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8'); //★追加
const style_css = fs.readFileSync('./style.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

// ここまでメインプログラム==========

// createServerの処理
function getFromClient(request, response) {

  var url_parts = url.parse(request.url);
  switch (url_parts.pathname) {

    case '/':
      var content = ejs.render(index_page, {
        title: "Index",
        content: "これはIndexページです。",
      });
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(content);
      response.end();
      break;

    case '/other': //★追加
      var content = ejs.render(other_page, {
        title: "Other",
        content: "これは新しく用意したページです。",
      });
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(content);
      response.end();
      break;

    default:
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('no page...');
      break;
  }
}