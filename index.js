'use strict'

const got = require('got')
const isString = require('lodash.isstring')
const isNumber = require('lodash.isnumber')
const isObject = require('lodash.isobject')
const merge = require('lodash.merge')
const sortBy = require('lodash.sortby')
const encode = require('wiki-article-name-encoding').encode

const isCoordinates = (l) => isObject(l) && isNumber(l.longitude) && isNumber(l.latitude)

const defaults = {
    language: 'en',
    maxDistance: 10000,
    maxResults: 10
}

const transformArticle = (a) => ({
    id: a.pageid,
    title: encode(a.title),
    coordinates: {
        longitude: a.lon,
        latitude: a.lat
    },
    distance: a.dist
})

const articles = async (coordinates, opt) => {
    const options = merge({}, defaults, opt)
    if(!isCoordinates(coordinates)) throw new Error('`coordinates` must be a valid wgs84 {longitude, latitude} coordinate object')
    if(!isString(options.language) || options.language.length === 0) throw new Error('`language` must be a language code string')
    if(!isNumber(options.maxDistance) || options.maxDistance < 0) throw new Error('`maxDistance` must be a number >= 0')
    if(!isNumber(options.maxResults) || options.maxResults <= 0) throw new Error('`maxResults` must be a number > 0')

    const data = await got(`https://${options.language}.wikipedia.org/w/api.php`, {
        json: true,
        query: {
            action: 'query',
            list: 'geosearch',
            gscoord: `${coordinates.latitude}|${coordinates.longitude}`,
            gsradius: options.maxDistance,
            gslimit: options.maxResults,
            format: 'json'
        }
    })

    return sortBy(data.body.query.geosearch.map(transformArticle), (x) => x.distance)
}

module.exports = articles
