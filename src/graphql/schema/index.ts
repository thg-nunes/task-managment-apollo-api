import { userResolvers } from './user/resolvers'
import { userTypeDefs } from './user/typeDefs'

const rootTypeDef = `#graphql
  type Query {
    _empty: Boolean
  }
`

const rootrResolvers = {
  Query: {
    _empty: () => true,
  },
}

export const typeDefs = [rootTypeDef, userTypeDefs]
export const resolvers = [rootrResolvers, userResolvers]
