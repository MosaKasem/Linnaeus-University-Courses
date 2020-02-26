//const sensor = require('node-dht-sensor')

exports.dht22 = () => {
    return new Promise((resolve, reject) => {
        sensor.read(22, 4,  function(err, temperature, humidity) {
            if (err) {
                return reject(err)
            } else { 
                resolve({temperature, humidity})
            }
        })
    })
}