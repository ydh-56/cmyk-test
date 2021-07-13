const sharp = require('sharp');

// sharp('./lemon.jpg')
//     .toColorspace('cmyk')
//     .toFile('output.jpg')
//     .then(() => {
//         console.log('변환 성공')
//     });

sharp('lemon.jpg')
    .resize({width:200, height:200})
    .rotate(90)
    .toFormat('png')
    .toFile('totate-output.jpg')
    .then(() => {
        console.log('리사이즈')
    });