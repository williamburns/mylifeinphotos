let express = require('express');
let router = express.Router();

let fs = require('fs');
let connect = require('../connect');

function getColumns(alias) {
    let name = __dirname + '/../public/img/moments/' + alias;
    if (fs.existsSync(name)) {
        let images = fs.readdirSync(name);
        let arr = [[],[],[],[]];

        let counter = 0;
        for (let image of images) {
            arr[counter].push(image);

            if (counter === 3) {
                counter = 0;
            } else {
                counter++;
            }
        }

        return arr;
    }

    return [];
}

function getImages(alias) {
    let name = __dirname + '/../public/img/moments/' + alias;
    if (fs.existsSync(name)) {
        return fs.readdirSync(name);
    }

    return [];
}

router.get('/:momentAlias', (req, res, next) => {
    res.render('moment', {
        title: connect.retrievedData[req.params.momentAlias].title,
        alias: req.params.momentAlias,
        columns: getColumns(req.params.momentAlias)
    });
});

router.get('/:momentAlias/:imageName', (req, res, next) => {
    res.render('zoom', {
        alias: req.params.momentAlias,
        image: req.params.imageName + ".jpg",
        images: getImages(req.params.momentAlias),
        title: connect.retrievedData[req.params.momentAlias].title
    });
});

module.exports = router;