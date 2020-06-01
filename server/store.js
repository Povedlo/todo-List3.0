const storage = require('azure-storage')
const service = storage.createTableService("mhlibzubov", "pWDNQU45lYcdobxzLjlKrNtLmDDiBzIJfgte3LtfblAq16+HppFA53qMXNKCf9zuMMA6jF3tyNArNHjBvaj8pw==")
const table = 'tasks'
const uuid = require('uuid')

const init = async () => (
  new Promise((resolve, reject) => {
    service.createTableIfNotExists(table, (error, result, response) => {
      !error ? resolve() : reject()
    })
  })
)

module.exports = {
  init
}

const addTask = async ({ title }) => (
  new Promise((resolve, reject) => {
    const gen = storage.TableUtilities.entityGenerator
    const task = {
      PartitionKey: gen.String('task'),
      RowKey: gen.String(uuid.v4()),
      title
    }

    service.insertEntity(table, task, (error) => {
      !error ? resolve() : reject()
    })
  })
)