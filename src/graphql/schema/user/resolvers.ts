import { Context } from '@schema/context'

const register = async (
  _,
  { registerInput }: { registerInput: { email: string; password: string } },
  { dataSources }: Context,
) => {
  return await dataSources.user.register({ ...registerInput })
}

export const userResolvers = { Mutation: { register } }
