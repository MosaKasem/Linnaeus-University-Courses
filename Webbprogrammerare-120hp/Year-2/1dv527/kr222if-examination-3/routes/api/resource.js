'use strict'

exports.resource = (req, res, next) => {
    res.json({
        id: `http://${req.headers.host}/api`,
        name: 'WoT Raspberry PI',
        description: 'A simple WoT-connected Raspberry Pi for the WoT.',
        links: {
        product: {
            link: 'https://www.raspberrypi.org/products/raspberry-pi-2-model-b/',
            title: 'Product this Web Thing is based on'
        },
        properties: {
                link: '/api/properties',
                title: 'List of Properties',
                temperature: {
                    name: 'Temperature Sensor DHT22',
                    description: 'A temperature sensor',
                    values: {
                        temp: {
                            name: 'Temperature sensor',
                            description: 'The temperature in Celsius',
                            unit: 'celsius',
                            pin: 'gpio: 4'
                        }
                    }
                },
                humidity: {
                    name: 'Humidity Sensor DHT22',
                    description: 'A humidity sensor',
                    values: {
                        humidity: {
                            name: 'Humidity',
                            description: 'Percentage of Humidity',
                            unit: '%',
                            pin: 'gpio: 4'
                        }
                    }
                },
                moisture: {
                    name: 'Moisture sensor MH',
                    description: 'A Moisture sensor',
                    values: {
                        humidity: {
                            name: 'Moisture',
                            description: 'Values given in both raw and percentage of Moisture',
                            data: 'raw',
                            unit: '%',
                            pin: 'gpio 23'
                        }
                    }
                }
            }
        }
    })
    next()
}