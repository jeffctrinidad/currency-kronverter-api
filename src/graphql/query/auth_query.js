const { GraphQLAccessToken, GraphQLUserInput } = require('../node_types')
const AuthenticationService = require('../../services/auth_service')

const AuthenticateUserQuery = {
  type: GraphQLAccessToken,
  args: {
    userInput: {
      type: GraphQLUserInput,
    },
  },
  resolve: (obj, { userInput: args }, { req }) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']
    const { email, password } = args
    const authenticationService = new AuthenticationService()
    return authenticationService.authenticateUser(email, password, token)
  },
}

module.exports = {
  AuthenticateUserQuery,
}
