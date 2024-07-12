import { User } from '@prisma/client'
import { Context } from '@schema/context'

/**
 * @async
 * @function login - função responsável por resolver a query login no userTypeDefs
 * @returns {{id: string, email: string }} - retorna um objeto contendo o id do usuário
 * e email para identificar se ele pode acessar os recursos privados ou não
 */
const login = async (
  _,
  { loginInput }: { loginInput: { email: string; password: string } },
  { dataSources }: Context,
) => {
  return await dataSources.user.login({ ...loginInput })
}

/**
 * @async
 * @function register - função responsável por resolver a mutation register no userTypeDefs
 * @returns {Omit<User, 'password'>} - retorna um objeto algums dados do usuário
 */
const register = async (
  _,
  { registerInput }: { registerInput: { email: string; password: string } },
  { dataSources }: Context,
) => {
  return await dataSources.user.register({ ...registerInput })
}

export const userResolvers = { Query: { login }, Mutation: { register } }
