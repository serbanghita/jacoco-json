# jacoco-json

Parse [jacoco](http://www.eclemma.org/jacoco/) report files, and return a JSON representation in a [lcov-parse](https://github.com/davglass/lcov-parse) compatible manner.

## Usage

```javascript
var jacoco = require("jacoco-json");

// Parse by file path
jacoco.parseFile("filepath.xml")
    .then(function (result) {
        console.log(JSON.stringify(result));
    }).catch(function (err) {
        console.error(err);
    });

// Parse by file contents
jacoco.parseContent("<?xml version=\"1.0\" ?><report>...</report>")
    .then(function (result) {
        console.log(JSON.stringify(result));
    }).catch(function (err) {
        console.error(err);
    });
```

## Thanks

This repo was initially forked from [vokal/jacoco-parse](https://github.com/vokal/jacoco-parse). Thanks a lot!
