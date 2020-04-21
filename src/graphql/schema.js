const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const { AuthenticateUserQuery } = require('./query/auth_query')
const { SearchCountryQuery } = require('./query/country_query')

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    authenticateUser: AuthenticateUserQuery,
    searchCountry: SearchCountryQuery,
  }),
})

const schema = new GraphQLSchema({
  query: Query,
})

module.exports = schema
