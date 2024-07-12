export const userTypeDefs = `#graphql
  type Mutation {
    register(registerInput: RegisterInput!): User!
  }

  type User {
    id: ID!
    email: String!
    createdAt: String!
    updatedAt: String
  }


  input RegisterInput {
    email: String!
    password: String!
  }
`
