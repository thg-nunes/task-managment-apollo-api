import { IncomingMessage, ServerResponse } from 'http'
import { UserDataSource } from './user/dataSources'
import { TaskDataSource } from './task/datasource'

export type Context = {
  req: IncomingMessage
  res: ServerResponse<IncomingMessage>
  dataSources: {
    user: UserDataSource
    task: TaskDataSource
  }
}
