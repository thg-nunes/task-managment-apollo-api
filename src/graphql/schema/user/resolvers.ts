import { Context } from '@schema/context'

const login = async (
  _,
  { loginInput }: { loginInput: { email: string; password: string } },
  { dataSources }: Context,
) => {
  return await dataSources.user.login({ ...loginInput })
}

const register = async (
  _,
  { registerInput }: { registerInput: { email: string; password: string } },
  { dataSources }: Context,
) => {
  return await dataSources.user.register({ ...registerInput })
}

export const userResolvers = { Query: { login }, Mutation: { register } }
