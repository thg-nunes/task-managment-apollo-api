import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'

import { prisma } from '@services/prisma'
import { AppError } from '@utils/appError'
import { createNewTokenAndRefreshToken, refreshTokenIsValid } from '@utils/jwt'

export class UserDataSource {
  async login(data: {
    email: string
    password: string
  }): Promise<Pick<User, 'id' | 'email' | 'token' | 'refresh_token'>> {
    for (const field in data) {
      if (!data[field])
        throw new AppError(`O ${field} não pode ser nulo.`, 'BAD_USER_INPUT')
    }

    const { email, password } = data

    const {
      id,
      email: userEmail,
      password: userPassword,
      ...rest
    } = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        token: true,
        refresh_token: true,
      },
    })

    if (!id) throw new AppError('Email ou senha incorreta.', 'NOT_FOUND')

    const passwordIsCorrect = await bcrypt.compare(password, userPassword)

    if (!passwordIsCorrect)
      throw new AppError('Email ou senha incorreta.', 'BAD_REQUEST')

    return { id, email: userEmail, ...rest }
  }

  async register(data: {
    email: string
    password: string
  }): Promise<Omit<User, 'password' | 'token' | 'refresh_token'>> {
    for (const field in data) {
      if (!data[field])
        throw new AppError(`O ${field} não pode ser nulo.`, 'BAD_USER_INPUT')
    }

    const { email, password } = data

    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    })

    if (userAlreadyExists)
      throw new AppError(`O email ${email} já esta cadastrado.`, 'BAD_REQUEST')

    const passwordHash = await bcrypt.hash(password, 12)

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

    return await prisma.user.create({
      data: { email, password: passwordHash, token, refresh_token },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async refresh_token(refresh_token: string) {
    if (!refresh_token)
      throw new AppError('Refresh token não encontrado', 'BAD_REQUEST')

    const payload = refreshTokenIsValid(refresh_token)

    const { token, refresh_token: refresh } = createNewTokenAndRefreshToken(
      payload.email,
    )

    return await prisma.user.update({
      where: { email: payload.email },
      data: { token, refresh_token: refresh },
      select: { token: true, refresh_token: true },
    })
  }
}
