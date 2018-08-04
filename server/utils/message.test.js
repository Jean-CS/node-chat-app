const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

describe('generate message', () => {
  it('should generate the correct message object', () => {
    const from = 'Test user'
    const text = 'Message from test user'

    const msg = generateMessage(from, text);

    expect(typeof msg.createdAt).toBe('number')
    expect(msg).toMatchObject({from, text})
  })
})

describe('generate location message', () => {
  it('should generate correct location object', () => {
    const from = 'Test user'
    const latitude = 33.527656
    const longitude = 126.769749

    const locMsg = generateLocationMessage(from, latitude, longitude)

    expect(typeof locMsg.createdAt).toBe('number')
    expect(locMsg).toMatchObject({
      from,
      url: `https://www.google.com/maps?q=${latitude},${longitude}`
    })
  })
})