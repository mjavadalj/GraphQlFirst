

const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Task {
    taskId: String!
    title: String!
    description: String!
    dueDate: String!
    related: [String!]!
}

input TaskInput {
    title: String!
    description: String!
    dueDate: String!
    related: [String]
}
type User {
    userId: String!
    password: String!
    tasks: [String!]
    relatedTasks: Task
}

input UserInput {
    userId: String!
    password: String!
    tasks: [String]
}

type RootQuery {
    tasks: [Task!]!
    users: [User!]!
}

type RootMutation {
    createTask(taskInput: TaskInput): Task
    createUser(userInput: UserInput): User
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`)