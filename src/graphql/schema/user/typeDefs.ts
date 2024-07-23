export const userTypeDefs = `#graphql
  type Query {
    login(loginInput: LoginInput!): LoginResponse!
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
    refreshToken: RefreshTokenResponse!
  }

  type User {
    id: ID!
    email: String!
    createdAt: String!
    updatedAt: String
  }

  type LoginResponse {
    id: ID!
    email: String!
    token: String!
    refresh_token: String!
  }

  type RefreshTokenResponse {
    token: String!
    refresh_token: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    email: String!
    password: String!
  }
`
