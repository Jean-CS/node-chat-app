const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  let users

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Peter',
      room: 'Java Course'
    }, {
      id: '3',
      name: 'Janna',
      room: 'Node Course'
    }]
  })

  it('should add new user', () => {
    const users = new Users()
    const user = {
      id: 123,
      name: 'Test name',
      room: 'Test room name'
    }

    const res = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('should remove a user', () => {
    const testUser = users.users[0]
    let user = users.removeUser(testUser.id)

    expect(user).toMatchObject(testUser)
    expect(users.users.length).toEqual(2)
  })

  it('should not remove user', () => {
    const user = users.removeUser('55')

    expect(user).toBeUndefined()
    expect(users.users.length).toEqual(3)
  })

  it('should find a user', () => {
    let testUser = users.users[2]
    let user = users.getUser(testUser.id)

    expect(user).toMatchObject(testUser)
  })

  it('should not find user', () => {
    let user = users.getUser('55')

    expect(user).toBeUndefined()
  })

  it('should return names for node course', () => {
    const userList = users.getUserList('Node Course')

    expect(userList).toEqual(['Mike', 'Janna'])
  })

  it('should return names for java course', () => {
    const userList = users.getUserList('Java Course')

    expect(userList).toEqual(['Peter'])
  })
})