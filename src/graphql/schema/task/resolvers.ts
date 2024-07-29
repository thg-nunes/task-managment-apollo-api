import { Context } from '@schema/context'

import { userIsAuthenticated } from '@utils/jwt'

import { CreateTaskInput } from './types'

/**
 * @async
 * @function createTask - função responsável por resolver a mutation createTask no taskTypeDefs
 * @returns {Object} - retorna um objeto com todas as props existentes ao criar a task
 */
const createTask = (
  _,
  { createTaskInput }: { createTaskInput: CreateTaskInput },
  { dataSources, req }: Context,
) => {
  userIsAuthenticated(req.headers.cookie)
  return dataSources.task.createTask(createTaskInput)
}

export const taksResolvers = {
  Mutation: { createTask },
}
