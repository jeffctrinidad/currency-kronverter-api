# currency-kronverter-api

This is a GraphQL API where you can search a country (with its details); and convert the country's currency to Swedish Krona.

How to use:

1. Run `npm install`.
2. Before starting the server, rename .env.sample -> .env then supply values to the variables inside.
   FIXER_API_KEY - access key for fixer.io
   ACCESS_TOKEN_SECRET_KEY - secret key for signing/verifying access token
   REFRESH_TOKEN_SECRET_KEY - secret key for signging/verifying refresh token
3. Run `npm run local`.
4. Access http://localhost:4000/graphql (or whichever PORT is set in .env)
5. It should prompt user about the missing token.
6. To generate an access token, checkout the file: `user_list.js`.
   It contains dummy user credentials. feel free to add/edit dummy user or use the existing user there.
7. To login, go to http://localhost:4000/graphql?operation=login.
8. Use the query authenticateUser() and supply the email and password from the `user_list.js`
9. It should generate the accessToken and refreshToken.
10. If using graphiql client, we need to use a plug-in like modheader to override the Authorization request header. Or we can also use other clients like Altair or Postman.
11. Once done, remove the `?operation=login` and the queries can now be used. (`?operation=login` is for logging in only)

Used prettier with the following settings:
{
"editor.formatOnSave": true,
"prettier.semi": false,
"prettier.singleQuote": true
}
