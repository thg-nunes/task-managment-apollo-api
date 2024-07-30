export const taskTypeDefs = `#graphql
  type Query {
    totalUserTasks(userId: Int!): Int!
    totalUserCompletedTasks(userId: Int!): Int!
  }

  type Mutation {
    createTask(createTaskInput: CreateTaskInput!): Task!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    dueDate: String
    userId: Int
    status: TaskStatus
    priority: LabelPriority
    createdAt: String!
    updatedAt: String!
  }

  input CreateTaskInput {
    title: String!
    description: String
    dueDate: String
    userId: Int!
    status: TaskStatus
    priority: LabelPriority
  }

  enum TaskStatus {
    PENDING
    CONPLETED
    IN_PROGRESS
  }

  enum LabelPriority {
    HIGH
    MIDIUM
    LOW
  }
`
