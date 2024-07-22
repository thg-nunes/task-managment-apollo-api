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
  { dataSources, res }: Context,
) => {
  const { token, refresh_token, ...rest } = await dataSources.user.login({
    ...loginInput,
  })

  res.setHeader('Set-Cookie', [
    `token=${token}`,
    `refresh_token=${refresh_token}`,
  ])

  return { token, refresh_token, ...rest }
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

/**
 * @async
 * @function refreshToken - função responsável por resolver a mutation refreshToken no userTypeDefs
 * @returns {{token: string, refresh_token: string}} - retorna um objeto com o novo token e refresh token
 */
const refreshToken = async (_, __, { dataSources, req }: Context) => {
  const refresh_token = req.headers.cookie
    ?.split('; ')
    ?.find((cookie) => cookie.startsWith('refresh_token='))
    ?.split('=')[1]

  return await dataSources.user.refresh_token(refresh_token)
}

export const userResolvers = {
  Query: { login },
  Mutation: { register, refreshToken },
}
