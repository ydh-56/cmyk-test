const sharp = require('sharp');

function example1(img) {
	return sharp(img)
		.resize(500, 500, {
			fit: 'inside', // With the max size of either dimension being 1000px
			withoutEnlargement: true // Don't change dimensions if already smaller
		}) // Resize to 1000x1000
		.trim() // Trim the white border
		.jpeg({ quality: 90 }) // Format as a JPEG with quality 90
		.toBuffer(); // Return as a Buffer
}

function example2(img) {
	return sharp(img)
		.resize(1000, 1000)
		.extract({
			top: 500,
			left: 500,
			width: 500,
			height: 500
		})
        .toFormat('jpg')
        .toColorspace('cmyk')
        .toFile('cmyk-test.jpg')
		.toBuffer();
}

module.exports = {
	example1,
	example2
};


// function example2(img) {
// 	return sharp(img)
// 		.resize(2000, 2000)
// 		.extract({
// 			top: 500,
// 			left: 500,
// 			width: 500,
// 			height: 500
// 		})
//         .toFormat('jpg')
//         .toColorspace('cmyk')
//         .toFile('cmyk-test.jpg')
// 		.toBuffer();
// }