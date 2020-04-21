const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
  if ('login' === req.query.operation) {
    next()
  } else {
    let token = req.headers['x-access-token'] || req.headers['authorization']
    let decodedToken

    if (token) {
      token = token.split(' ')[1]
      decodedToken = jwt.decode(token)
      req.authenticated = false

      if (!decodedToken) {
        return res.send({
          error: 'Invalid Signature',
        })
      }

      try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        req.decodedToken = decodedToken
        req.authenticated = true
        next()
      } catch (error) {
        return res.send({
          error: error.message,
        })
      }
    } else {
      return res.send({
        error: {
          message: 'Missing Access Token',
        },
      })
    }
  }
}

module.exports = authenticate
