'use strict'

const coreAudio = require('node-core-audio')

// This is pretty specific to my local config.
const device = {
  inputDevice: 4,
  outputDevice: 4,
  inputChannels: 64,
  outputChannels: 2
}

const engine = coreAudio.createNewAudioEngine(device)

console.log('\n')
console.log('List of available devices:')
for (let i = 0; i < engine.getNumDevices(); i++) {
  console.log('%s: %s', i, engine.getDeviceName(i))
}
console.log('\n')

const targetBuffer = []

engine.addAudioCallback((buffer) => {
  for (let i = 0; i < buffer.length; i++) {
    targetBuffer[i] = []
    for (let j = 0; j < buffer[i].length; j++) {
      targetBuffer[i][j] = buffer[i][j]
    }
  }
  return buffer
})

// This is for early development purpose only
setTimeout(() => {
  console.log(targetBuffer)
  const buffer = JSON.stringify(targetBuffer)
  require('fs').writeFile('./buffer.json', buffer, 'utf-8', () => {
    console.log('wrote ./buffer.json file')
    process.exit()
  })
}, 5000)
