const fetch = require('node-fetch')

module.exports = class CurrencyService {
  async getKronaConversion(code) {
    let currencyConversion = await fetch(
      `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&symbols=SEK,${code}&format=1`
    ).then((res) => res.json())
    return currencyConversion.rates['SEK'] / currencyConversion.rates[code]
  }
}
