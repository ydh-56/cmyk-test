var express = require("express");
const PDFDocument = require("pdfkit");
var router = express.Router();

const pathToLogo = __dirname + "/blue.jpg";

function generateLine(doc, spacing) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, spacing)
    .lineTo(550, spacing)
    .stroke();
}

function generateHeader(doc) {
  doc.image(pathToLogo, 50, 45, { width: 50 });
  doc.fontSize(20).text("QSDF Inc.", 110, 57);
  doc
    .fontSize(10)
    .text("QSDF Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateTable(doc) {
  const infos = {
    owner: "someone",
    date: "30/11/2000",
    id: "3568SRTY0iik",
    abcd: "abcd",
    efgh: "efgh"
  };
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Tabular information", 50, 160);
  generateLine(doc, 185);
  doc
    .fontSize(10)
    .text("Reference id:", 50, 200)
    .font("Helvetica-Bold")
    .text(infos.id, 150, 200)
    .font("Helvetica")
    .text("Owner:", 50, 215)
    .text(infos.owner, 150, 215)
    .text("Date:", 50, 230)
    .text(infos.date, 150, 230)
    .font("Helvetica-Bold")
    .text(infos.owner, 300, 200)
    .font("Helvetica")
    .text(infos.abcd, 300, 215)
    .text(infos.efgh, 300, 230)
    .moveDown();
  generateLine(doc, 252);
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text("This is a footer.", 50, 780, { align: "center", width: 500 });
}

/* GET users listing. */
router.get("/", function(req, res, next) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  generateHeader(doc);
  generateTable(doc);
  generateFooter(doc);
  doc.end();

  // Content-disposition: inline; -> display pdf in browser
  // Content-disposition: attachment; -> triggers download
  res.setHeader("Content-disposition", 'attachment; filename="mypdf.pdf"');
  res.setHeader("Content-type", "application/pdf");
  doc.pipe(res);
});

module.exports = router;
