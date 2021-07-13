const axios = require('axios');
const http = require('http');
const url = require('url');
// const pdf = require('./pdf-example');
const express = require('express');
const app = express();
const pdfDocument = require('PDFKit');
const fs = require("fs");

let doc = new pdfDocument();



// 출력파일 지정
doc.pipe(fs.createWriteStream("output2.pdf"));

doc.image('./blue.jpg', {
    fit: [500, 500],
    align:'center',
    valign:'center'
});

// 페이지 추가
doc.addPage()
    .image('./blue1.jpg', {
        fit:[500, 500],
        align: 'center',
        valign: 'center'
    });

doc.end();



app.listen(3005, () => {
  console.log('3005 port');
});

 