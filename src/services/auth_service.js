const { USER_LIST } = require('../../user_list')
const jwt = require('jsonwebtoken')

module.exports = class AuthenticationService {
  getUserByEmail(email) {
    return USER_LIST.find((user) => user.email === email)
  }

  authenticateUser(email, password, token) {
    let decodedToken
    let user
    if (token) {
      try {
        token = token.split(' ')[1]
        decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY)
      } catch (error) {
        throw new Error('jwt expired')
      }
      user = this.getUserByEmail(decodedToken.email)
      if (!user) {
        throw new Error('Invalid user')
      }
    } else {
      user = this.getUserByEmail(email)
      if (!user) {
        throw new Error('User does not exist')
      }
      if (user.password !== password) {
        throw new Error('Incorrect password')
      }
    }
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: '1h' }
    )
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: '2h' }
    )
    return {
      accessToken,
      refreshToken,
    }
  }
}
