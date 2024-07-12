import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

import { prisma } from '@services/prisma'
import { AppError } from '@utils/appError'

export class UserDataSource {
  async login(data: {
    email: string
    password: string
  }): Promise<Pick<User, 'id' | 'email'>> {
    for (const field in data) {
      if (!data[field])
        throw new AppError(`O ${field} não pode ser nulo.`, 'BAD_USER_INPUT')
    }

    const { email, password } = data

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    })

    if (!user) throw new AppError('Email ou senha incorreta.', 'NOT_FOUND')

    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    if (!passwordIsCorrect)
      throw new AppError('Email ou senha incorreta.', 'BAD_REQUEST')

    return { id: user.id, email: user.email }
  }

  async register(data: {
    email: string
    password: string
  }): Promise<Omit<User, 'password'>> {
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

    return await prisma.user.create({
      data: { email, password: passwordHash },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }
}
