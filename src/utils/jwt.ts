import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { AppError } from './appError'

/**
 * @function tokenIsValid - verifica se o token tem assinatura válida
 * @param {string} token - token enviado atravéz dos header.cookie
 * @returns {{ email: string }} - se o token tiver assinatura válida, o objeto contendo o email do
 * user é retornado
 */
const tokenIsValid = (token: string) => {
  const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY) as {
    email: string
  }

  if (!payload.email) throw new AppError('Token inválido', 'BAD_REQUEST')

  return payload
}

/**
 * @function refreshTokenIsValid - verifica se o refreshToken tem assinatura válida
 * @param {string} refreshToken - refreshToken enviado atravéz dos header.cookie
 * @returns {{ email: string }} - se o refreshToken tiver assinatura válida, o objeto contendo o email do
 * user é retornado
 */
const refreshTokenIsValid = (refreshToken: string) => {
  const payload = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
  ) as {
    email: string
  }

  if (!payload.email)
    throw new AppError('Refresh token inválido', 'BAD_REQUEST')

  return payload
}

/**
 * @function createNewTokenAndRefreshToken - cria um novo token e refreshing token
 * @param {string} email - email do usuário a ser assinalado no token e refresh token
 * @returns {{ token: string; refresh_token: string }} - retorna um objeto com um novo token e refresh token
 */
const createNewTokenAndRefreshToken = (email: string) => {
  const token = jwt.sign({ email }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: '1d',
  })

  const refresh_token = jwt.sign(
    { email },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: '7d',
    },
  )

  return { token, refresh_token }
}

/**
 * @function userIsAuthenticated - verifica se o token está presente nos cookies se é válido
 * @returns {boolean} - se o token for estiver presente nos cookies e for válido é retornado um boolean
 * com valor 'true', caso contrário um erro é lançado
 */
const userIsAuthenticated = (cookie: string) => {
  try {
    const token = cookie
      ?.split('; ')
      ?.find((cookie) => cookie.startsWith('token='))
      ?.split('=')[1]

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, {
      ignoreExpiration: false,
    })
  } catch (err) {
    if (err instanceof TokenExpiredError)
      throw new AppError('Token expirado', 'BAD_REQUEST')

    throw new AppError('Token inválido', 'FORBIDDEN')
  }
}

/**
 * @function getRefreshTokenValueFromCookie - obtém o refresh token dos cookies
 * @returns {boolean} - retorna o valor do refresh token
 */
const getRefreshTokenValueFromCookie = (cookie: string) => {
  const refresh_token = cookie
    ?.split('; ')
    ?.find((cookie) => cookie.startsWith('refresh_token='))
    ?.split('=')[1]

  return refresh_token
}

export {
  tokenIsValid,
  refreshTokenIsValid,
  userIsAuthenticated,
  getRefreshTokenValueFromCookie,
  createNewTokenAndRefreshToken,
}
