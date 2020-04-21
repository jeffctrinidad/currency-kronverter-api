const fetch = require('node-fetch')

module.exports = class CountryService {
  async getCountryDetails(keyword) {
    let countries = await fetch(
      `https://restcountries.eu/rest/v2/name/${keyword}`
    ).then((res) => res.json())
    return !countries.status
      ? countries.map(({ name, population, currencies, flag }) => {
          return {
            name,
            population,
            currencies,
            flag,
          }
        })
      : []
  }
}
