'use strict'
const router = require('express').Router()
const DHT22 = require('../../model/ht_model')
const MH = require('../../model/mh_model')
const checkOrigin = require('../../auth/validate_origin')
const mhPlugin = require('../../plugins/mh')
const dhtPlugin = require('../../plugins/dht')

// LIST CURRENT PROPERTIES
router.get('/', async (req, res, next) => {
    try {
        const mhCurrent = await mhPlugin.mh()
        const dhtCurrent = await dhtPlugin.dht22()

        const data = { ...dhtCurrent, ...mhCurrent }

        const newDHT = new DHT22({
            'temp': data.temperature,
            'humidity': data.humidity
        })
        const newMH = new MH({
            'moisture': data.moisture
        })
        await newDHT.save()
        await newMH.save()

        const percent = ((parseInt(data.moisture, 10) / 1023) * 100).toFixed(1)

        const properties = [
            {
                id: 'Temperature',
                name: 'Temperature sensor.',
                values: {
                    t: data.temperature,
                    time: Date.now()
                },
                request: {
                    url: `http://${req.headers.host}/temperature`,
                    methods: 'GET',
                    response: 'List of historical temperature values.'
                }
            },
            {
                id: 'Humidity',
                name: 'Humidity sensor.',
                values: {
                    h: data.humidity,
                    time: Date.now()
                },
                request: {
                    url: `http://${req.headers.host}/humidity`,
                    methods: 'GET',
                    response: 'List of historical humidity values.'
                }
            },
            {
                id: 'Moisture',
                name: 'Moisture sensor.',
                values: {
                    raw: data.moisture,
                    percent: percent,
                    time: Date.now()
                },
                request: {
                    url: `http://${req.headers.host}/moisture`,
                    methods: 'GET',
                    requirements: 'List of historical soil moisture values.'
                }
            }
        ]
        res.status(200).send(properties)
    } catch (err) {
       return next(err)
    }
})

router.get('/temperature', async (req, res, next) => {
    try {
        const t = await HT22.find({}).select('temp date _id')

        const t_historcal = {
            t: t.map(ht => {
                return {
                    id: t._id,
                    temp: t.temp,
                    date: t.date
                }
            })
        }
        res.status(200).send(t_historcal)
    } catch (error) {
        return next(err)
    }
})

router.get('/humidity', async (req, res, next) => {
    try {
        const h = await HT22.find({}).select('humidity date _id')

        const h_historcal = {
            h: h.map(h => {
                return {
                    id: h._id,
                    humidity: h.humidity,
                    date: h.date
                }
            })
        }
        res.status(200).send(h_historcal)
    } catch (error) {
        return next(err)
    }
})

router.get('/moisture', async (req, res, next) => {
    try {
        const mh = await MH.find({}).select('isMoist date')

        const mh_historical = {
            mh: mh.map(mh => {
                return {
                    moisture: mh.moisture,
                    date: mh.date
                }
            })
        }
        res.status(200).send(mh_historical)
    } catch (error) {
        return next(err)
    }
})

module.exports = router
