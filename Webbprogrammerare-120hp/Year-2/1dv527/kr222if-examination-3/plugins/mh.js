
//const rpio = require('rpio')

function mh() {
    rpio.spiBegin()
    let value
    try {
        for (let channel = 0; channel <= 0; channel++) {
            let txBuffer = new Buffer([0x01, (8 + channel << 4), 0x01])
            let rxBuffer = new Buffer(txBuffer.byteLength)
    
            rpio.spiTransfer(txBuffer, rxBuffer, txBuffer.length) // Send TX buffer and recieve RX buffer
    
            let junk = rxBuffer[0],
                MSB = rxBuffer[1],
                LSB = rxBuffer[2]
    
            value = ((MSB & 3) << 8) + LSB
    
            process.stdout.write(value.toString() + (channel == 0 ? '\n' : '\t'))
            return { moisture: value.toString() }
        }
        } catch(err) {
           throw Error('Something wrong while reading mh sensor.')
        }

    process.on('SIGTERM', () => {
    
        process.exit(0)
    })
    
    process.on('SIGINT', () => {
        process.exit(0)
    })
    
    process.on('exit', () => {
        console.log('\nShutting down, performing GPIO cleanup')
        rpio.spiEnd()
        process.exit(0)
    })
}
exports.mh = mh