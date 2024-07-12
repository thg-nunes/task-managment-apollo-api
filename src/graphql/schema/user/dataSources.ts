import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

import { prisma } from '@services/prisma'
import { AppError } from '@utils/appError'

export class UserDataSource {
  async register(data: { email: string; password: string }): Promise<User> {
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

    return await prisma.user.create({ data: { email, password: passwordHash } })
  }
}
