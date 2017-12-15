'use strict'

const tape = require('tape')
const articles = require('./index')

const isNumber = require('lodash.isnumber')
const isObject = require('lodash.isobject')

const isCoordinates = (l) => isObject(l) && isNumber(l.longitude) && isNumber(l.latitude)

tape('wikipedia-location-search', async (t) => {
	const data = await articles({latitude: 37.786952, longitude: -122.399523}, {language: 'de'})

	t.ok(data.length === 10, 'length')
	const day = data[0]
	t.ok(day.id === 39927, 'id')
	t.ok(day.title === 'Wikimedia_Foundation', 'title')
	t.ok(isCoordinates(day.coordinates), 'coordinates')
	t.ok(day.distance >= 0, 'distance')
	t.end()
})
