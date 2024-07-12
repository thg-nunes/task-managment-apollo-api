import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { resolvers, typeDefs } from '@schema/index'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })
  console.log(`🚀 Server ready at: ${url}`)
}

startServer()
