const fs = require('fs')
const { 
  addExpense, 
  checkExpensesFileExists, 
  listExpenses,
  summaryExpenses,
  deleteExpense
} = require('./functions.js')

let args = process.argv.slice(2)
let command = args[0]
let commandArgs = args.slice(1)

checkExpensesFileExists()

switch(command) {
  case 'add':
    addExpense(commandArgs)
    break
  case 'list':
    listExpenses()
    break
  case 'summary':
    summaryExpenses(commandArgs)
    break
  case 'delete':
    deleteExpense(commandArgs)
    break
  case undefined:
    console.log('Provide a command: node app.js command')
    break
  default:
    console.log('Provide a valid command: node app.js command')
    break
}