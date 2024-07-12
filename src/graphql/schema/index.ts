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

export const typeDefs = [rootTypeDef]
export const resolvers = [rootrResolvers]
