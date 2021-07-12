const axios = require('axios');
const http = require('http');
const url = require('url');
const sharp = require('./sharp-example');

async function getImageFromUrl(url) {
	return await axios
		.get(url, { responseType: 'arraybuffer' })
		.then(res => new Buffer(res.data, 'binary'));
}

let jpgOne;
let jpgTwo;

async function init() {
	jpgOne = await getImageFromUrl('https://i.imgur.com/C1ZK1h5.jpg'); // 1.10 MB 1240x1753
	jpgTwo = await getImageFromUrl('https://picsum.photos/4000'); // 4000px

}

init();

http.createServer(async (req, res) => {
	const request = url.parse(req.url, true);
	const action = request.pathname;

	if (action === '/sharp/one') {
		const img = await sharp.example1(jpgOne);

		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end(img, 'binary');
	} else if (action === '/sharp/two') {
		const img = await sharp.example2(jpgTwo);

		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		res.end(img, 'binary');
	}  else {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(`<!DOCTYPE html><html><body>
			<p>Sharp example #1</p><img src="/sharp/one" />
        	<p>Sharp example #2</p><img src="/sharp/two" />
			</body></html>`);
	}
}).listen(3010, (() => {
    console.log('port start')
}));


// const express = require('express');
// const app = express();
// const multer = require('multer');
// const sharp = require('sharp');
// const fs = require('fs');
// const http = require('http');

// const img = fs.readFileSync('./lemon.jpg');

// http 
//     .createServer(function (req, res) {
//         res.writeHead(200, {'Content-Type' : 'image/jpg'});
//         res.end(img, 'binary');
//     })
//     .listen(3005);


// const imageDir = multer({
//     storage : multer.diskStorage({
//         destination: function(req, file, cb) {
//             cb(null, imageDir);
//         },
//         filename: function(req, file, cb) {
//             var filename = req.params.imageName;
//             var ext = file.mimetype.split('/')[1];

//             if(!['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
//                 return cb(new Error('Only images are allowed'))
//             }
//             cb(null, filename + '.jpg');
//         }
//     })
// });

// router.post('/:imageName', upload.single('file'), function(req, res) {
//     res.status(200).json({message: 'success'});
// });

// router.get('/:imageName', async function(req, res) {
//     var size = req.query.size;
//     var filename = imageDir + req.params.imageName + '.jpg';
//     if(size) {
//         size = size.split('x');
//         res.status(200).end(await sharp(filename).resize({width:parseInt(size[0]), height:parseInt(size[1]), fit: sharp.fit.contain}).toBuffer());
//     } else {
//         res.status(200).end(fs.readFileSync(filename));
//     }
// });




// app.listen(3005, () => {
//     console.log('port check');
// })