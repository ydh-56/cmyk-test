
// 모듈로드

const pdfDocument = require('PDFKit');

const fs = require("fs");


    let doc = new pdfDocument();



// 출력파일 지정

doc.pipe(fs.createWriteStream("output1.pdf"));




// 문자표시 

doc.fontSize(30).text("Wicked_MISO", 90, 100);

doc.fontSize(20).text("사악미소", 100, 180);



// 도형 그리기

doc.save()

	.moveTo(80, 80)

	.lineTo(300, 80)

	.lineTo(300, 150)

	.lineTo(80, 150)

	.lineTo(80, 80)

	.stroke("#0000FF");



// 페이지 추가

doc.addPage();



// 도형 그리기

doc.save()

	.moveTo(100, 150)

	.lineTo(100, 250)

	.lineTo(200, 250)

	.fill("#FF0000");



// 종료

doc.end();


// 도큐먼트 생성

