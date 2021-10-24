# :warning: UNMAINTAINED, PLEASE USE [WIKIDATA](https://www.wikidata.org) INSTEAD.

# wikipedia-location-search

Search for wikipedia articles based on given geolocation using [this API](https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=37.786952%7C-122.399523&gsradius=10000&gslimit=10). Work in progress.

[![npm version](https://img.shields.io/npm/v/wikipedia-location-search.svg)](https://www.npmjs.com/package/wikipedia-location-search)
[![Build Status](https://travis-ci.org/juliuste/wikipedia-location-search.svg?branch=master)](https://travis-ci.org/juliuste/wikipedia-location-search)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/wikipedia-location-search.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/wikipedia-location-search.svg)](https://david-dm.org/juliuste/wikipedia-location-search)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/wikipedia-location-search.svg)](https://david-dm.org/juliuste/wikipedia-location-search#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/wikipedia-location-search.svg?style=flat)](LICENSE)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```shell
npm install wikipedia-location-search
```

## Usage

The module returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in a list of locations:

```js
const articles = require('wikipedia-location-search')

articles(coordinates, opt)
```

The defaults for `opt` look like this:

```js
{
    language: 'en', // wiki language code
    maxDistance: 10000, // max. distance to the coordinates in meters
    maxResults: 10 // max. number of results returned
}
```

```js
articles({latitude: 37.786952, longitude: -122.399523}, {language: 'de'})
.then(console.log)
```

would give you something like this:

```js
[
    {
        "id": 39927,
        "title": "Wikimedia_Foundation",
        "coordinates": {
            "longitude": -122.39957,
            "latitude": 37.78687
        },
        "distance": 10
    },
    {
        "id": 1365097,
        "title": "Cartoon_Art_Museum",
        "coordinates": {
            "longitude": -122.40098480194,
            "latitude": 37.787328048611
        },
        "distance": 135.1
    },
    {
        "id": 904290,
        "title": "San_Francisco_Museum_of_Modern_Art",
        "coordinates": {
            "longitude": -122.40083333333,
            "latitude": 37.785833333333
        },
        "distance": 169.5
    }
    // … 7 more
]
```

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/wikipedia-location-search/issues).
