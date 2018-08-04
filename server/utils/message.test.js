const expect = require('expect');

const {generateMessage} = require('./message');

describe('generate message', () => {
  it('should generate the correct message object', () => {
    const from = 'Test user'
    const text = 'Message from test user'

    const msg = generateMessage(from, text);

    expect(typeof msg.createdAt).toBe('number')
    expect(msg).toMatchObject({from, text})
  })
})