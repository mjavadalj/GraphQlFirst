

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

type RootQuery {
    tasks: [Task!]!
}

type RootMutation {
    createTask(taskInput: TaskInput): Task
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`)