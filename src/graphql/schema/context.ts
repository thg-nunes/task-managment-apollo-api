import { IncomingMessage, ServerResponse } from 'http'
import { UserDataSource } from './user/dataSources'

export type Context = {
  req: IncomingMessage
  res: ServerResponse<IncomingMessage>
  dataSources: {
    user: UserDataSource
  }
}
