const exp = require('constants')
const fs = require('fs')
const months = ['January', 'Februrary', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
]

function checkExpensesFileExists() {
  fs.stat('expenses.json', (err, stats) => {
    if(err)
      fs.writeFileSync('expenses.json', '[]', 'utf8')
  })
}

function getExpenses() {
  let expenses = fs.readFileSync('expenses.json', 'utf8')

  return JSON.parse(expenses)
}

function setExpenses(expenses) {
  fs.writeFileSync('expenses.json', expenses, 'utf8')
}

function findFreeId (array) {
  const sortedArray = array
    .slice()
    .sort(function (a, b) {return a.id - b.id});
  let previousId = 0;
  for (let element of sortedArray) {
    if (element.id != (previousId + 1)) {
      return previousId + 1;
    }
    previousId = element.id;
  }
  
  return previousId + 1;
}

function getFreeId() {
  let expenses = getExpenses()
  let id = findFreeId(expenses)

  return id
}

function getCurrentDate(timestamp) {
  let today = new Date(timestamp);
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = `${mm}-${dd}-${yyyy}`

  return today
}

function addExpense(args) {
  if(args[0] != '--description' && args[2] != '--amount') {
    console.log('Incorrect flags: node app.js add --description DESCRIPTION --amount AMOUNT')
    return
  }

  let id = getFreeId()
  let description = args[1]
  let amount = parseFloat(args[3])
  let date = Date.now()
  let expenses = getExpenses()

  let expense = {
    id,
    date,
    description,
    amount,
  }

  expenses.push(expense)

  expenses = JSON.stringify(expenses, null, ' ')

  setExpenses(expenses)

  console.log(`Expense added successfully (ID: ${id})`)
}



function listExpenses() {
  let expenses = getExpenses()

  if(expenses.length == 0) {
    console.log('List empty')
    return
  }

  let idLength = 'ID'.length
  let dateLength = '00-00-0000'.length
  let descriptionLength = 'Description'.length
  let amountLength = 'Amount'.length

  for(let expense of expenses) {
    let expenseIdLength = expense.id.length
    let expenseDateLength = expense.date.length
    let expenseDescriptionLength = expense.description.length
    let expenseAmountLength = expense.amount.length + 1

    if(expenseIdLength > idLength)
      idLength = expenseIdLength
    if(expenseDateLength > dateLength)
      dateLength = expenseDateLength
    if(expenseDescriptionLength > descriptionLength)
      descriptionLength = expenseDescriptionLength
    if(expenseAmountLength > amountLength)
      amountLength = expenseAmountLength
  }

  let idString = 'ID'.padEnd(idLength, ' ')
  let dateString = 'Date'.padEnd(dateLength, ' ')
  let descriptionString = 'Description'.padEnd(descriptionLength, ' ')
  let amountString = 'Amount'.padEnd(amountLength, ' ')

  console.log(`${idString}  ${dateString}  ${descriptionString}  ${amountString}`)

  for(let expense of expenses) {
    let id = String(expense.id).padEnd(idLength, ' ')
    let date = getCurrentDate(expense.date)
    date = date.padEnd(dateLength, ' ')
    let description = expense.description.padEnd(descriptionLength, ' ')
    let amount = String(expense.amount).padEnd(amountLength, ' ')

    console.log(`${id}  ${date}  ${description}  $${amount}`)
  }
}

function summaryExpenses(args) {
  let flag = args[0]
  let month = args[1]

  if(flag && flag != '--month') {
    console.log('Incorrect flag: node app.js summary --month MONTH')
    return
  }

  let expenses = getExpenses()
  let totalAmount = 0

  if(month) {
    let monthName = months[month - 1]

    for(let i = 0; i < expenses.length; i++) {
      let date = new Date(expenses[i].date)

      if(date.getMonth() + 1 == month) {
        totalAmount += expenses[i].amount
      }
    }

    console.log(`Total expenses for ${monthName}: $${totalAmount}`)
  } else { 
    for(let expense of expenses) {
      totalAmount += expense.amount
    }

    console.log(`Total expenses: $${totalAmount}`)
  }
}

function deleteExpense(args) {
  let flag = args[0]
  let id = args[1]

  if(flag != '--id') {
    console.log('Incorrect flag: node app.js delete --id ID')
    return
  }

  if(!id) {
    console.log('Provide an id: node app.js delete --id ID')
    return
  }

  let expenses = getExpenses()

  for(let i = 0; i < expenses.length; i++) {
    if(expenses[i].id == id) {
      expenses.splice(i, 1)
      
      expenses = JSON.stringify(expenses, null, ' ')
      
      setExpenses(expenses)

      console.log('Expense deleted successfully')

      return
    }
  }

  console.log('ID not found')
}

module.exports = { addExpense, checkExpensesFileExists, listExpenses, summaryExpenses, deleteExpense }