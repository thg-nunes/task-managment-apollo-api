import { prisma } from '@services/prisma'

import { AppError } from '@utils/appError'

import { CreateTaskInput } from './types'

export class TaskDataSource {
  async createTask(data: CreateTaskInput) {
    const requiredFields = ['title', 'userId']

    for (const field of requiredFields) {
      if (!data[field]) {
        throw new AppError(`O campo ${field} é obrigatório`, 'BAD_USER_INPUT')
      } else if (data[field] === undefined || data[field] === '')
        throw new AppError(
          `O campo ${field} deve ter um valor`,
          'BAD_USER_INPUT',
        )
    }

    if (data.dueDate) {
      const currentDay = new Date().getDate()
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()

      const [finalTaskDayDate, finalTaskMonthDate, finalTaskYearDate] =
        data.dueDate.split('/').map((date) => parseInt(date))

      if (finalTaskYearDate < currentYear)
        throw new AppError(
          'O ano de finalização da task não pode ser menor que o ano atual',
          'BAD_USER_INPUT',
        )

      if (finalTaskMonthDate < currentMonth + 1)
        throw new AppError(
          'O mês de finalização da task não pode ser menor que o mês atual',
          'BAD_USER_INPUT',
        )

      if (finalTaskDayDate < currentDay)
        throw new AppError(
          'O dia de finalização da task não pode ser menor que o dia atual',
          'BAD_USER_INPUT',
        )

      const dateTime = new Date(
        `${finalTaskMonthDate}/${finalTaskDayDate}/${finalTaskYearDate}`,
      )
      return await prisma.task.create({ data: { ...data, dueDate: dateTime } })
    }

    return await prisma.task.create({ data })
  }
}
