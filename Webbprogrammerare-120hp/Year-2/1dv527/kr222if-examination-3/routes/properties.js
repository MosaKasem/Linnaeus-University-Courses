'use strict'
const router = require('express').Router()
const HT22 = require('../model/ht_model')
const MH = require('../model/mh_model')

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
        // properties.forEach(() => {
            
        // })
        res.status(200).send(properties)
    } catch (err) {
       return next(err)
    }
})


router.get('/temperature', async (req, res, next) => {
    try {
        const ht = await HT22.find({}).select('temp date _id')

        const t_historcal = {
            ht: ht.map(ht => {
                return {
                    temperature: ht.temp,
                    date: ht.date
                }
            })
        }
        res.render('past_data_t', t_historcal)
    } catch (error) {
        return next(err)
    }
})

router.get('/humidity', async (req, res, next) => {
    try {
        const ht = await HT22.find({}).select('humidity date _id')

        const h_historcal = {
            ht: ht.map(ht => {
                return {
                    humidity: ht.humidity,
                    date: ht.date
                }
            })
        }
        res.render('past_data_h', h_historcal)
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
                    isMoist: mh.isMoist,
                    date: mh.date
                }
            })
        }
        res.render('past_data_mh', mh_historical)
    } catch (error) {
        return next(err)
    }
})



module.exports = router
