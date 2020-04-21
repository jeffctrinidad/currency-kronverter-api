const { GraphQLCountries, GraphQLSearchInput } = require('../node_types')
const CountryService = require('../../services/country_service')
const { getGraphQLRateLimiter } = require('graphql-rate-limit')

const rateLimiter = getGraphQLRateLimiter({
  identifyContext: ({ req }) => req.headers.authorization.split(' ')[1],
})
const SearchCountryQuery = {
  type: GraphQLCountries,
  args: {
    searchInput: {
      type: GraphQLSearchInput,
    },
  },
  resolve: async (obj, args, context, info) => {
    if (!context.req.decodedToken) {
      throw new Error('Unauthorized access!')
    }
    const errorMessage = await rateLimiter(
      { obj, args, context, info },
      { max: 30, window: '60s' }
    )
    if (errorMessage) throw new Error(errorMessage)
    const countryService = new CountryService()
    const countries = await countryService.getCountryDetails(
      args.searchInput.keyword
    )
    return { countries }
  },
}

module.exports = {
  SearchCountryQuery,
}
