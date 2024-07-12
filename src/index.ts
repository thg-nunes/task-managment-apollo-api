import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { Context } from '@schema/context'
import { resolvers, typeDefs } from '@schema/index'
import { UserDataSource } from '@schema/user/dataSources'

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
})

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      return {
        req,
        res,
        dataSources: {
          user: new UserDataSource(),
        },
      }
    },
  })
  console.log(`🚀 Server ready at: ${url}`)
}

startServer()
