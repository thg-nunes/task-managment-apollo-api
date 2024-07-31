import cors from 'cors'
import http from 'http'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import { Context } from '@schema/context'
import { resolvers, typeDefs } from '@schema/index'
import { UserDataSource } from '@schema/user/dataSources'
import { TaskDataSource } from '@schema/task/datasource'

const app = express()

const httpServer = http.createServer(app)

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

async function startServer() {
  await server.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: [`${process.env.WEB_APP_HOST}`],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return {
          req,
          res,
          dataSources: {
            user: new UserDataSource(),
            task: new TaskDataSource(),
          },
        }
      },
    }),
  )

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  )

  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
}

startServer()
