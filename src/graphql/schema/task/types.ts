type TaskStatus = 'PENDING' | 'CONPLETED' | 'IN_PROGRESS'

type LabelPriority = 'HIGH' | 'MIDIUM' | 'LOW'

export type CreateTaskInput = {
  title: string
  description?: string
  dueDate?: string
  userId: number
  status?: TaskStatus
  priority?: LabelPriority
}
