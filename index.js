const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const schema = require('./src/graphql/schema')
const authenticate = require('./src/middleware/authenticate')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(authenticate)
app.use('/graphql', (req, res) => {
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    pretty: true,
    context: { req },
  })(req, res)
})
app.listen(process.env.SERVER_PORT)
console.log(
  `Running a GraphQL API server at http://localhost:${process.env.SERVER_PORT}/graphql`
)
