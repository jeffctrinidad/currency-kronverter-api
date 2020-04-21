const {
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
} = require('graphql')
const CurrencyService = require('../services/currency_service')

const GraphQLAccessToken = new GraphQLObjectType({
  name: 'AccessToken',
  fields: () => ({
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
  }),
})

const GraphQLUserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  }),
})

const GraphQLSearchInput = new GraphQLInputObjectType({
  name: 'SearchInput',
  fields: () => ({
    keyword: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})

const GraphQLCurrency = new GraphQLObjectType({
  name: 'Currency',
  fields: () => ({
    code: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    symbol: {
      type: GraphQLString,
    },
    sekRate: {
      type: GraphQLFloat,
      resolve: ({ code }) => {
        const currencyService = new CurrencyService()
        return currencyService.getKronaConversion(code)
      },
    },
  }),
})

const GraphQLCountry = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    population: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    currencies: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLCurrency)),
    },
    flag: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})

const GraphQLCountries = new GraphQLObjectType({
  name: 'Countries',
  fields: () => ({
    countries: {
      type: new GraphQLList(GraphQLCountry),
    },
  }),
})

module.exports = {
  GraphQLAccessToken,
  GraphQLSearchInput,
  GraphQLUserInput,
  GraphQLCountries,
}
