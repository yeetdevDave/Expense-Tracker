# Expense-Tracker

Expense Tracker is a project (https://roadmap.sh/projects/expense-tracker) to build a simple expense tracker application to manage your finances.

# How to install

```
git clone https://github.com/yeetdevDave/Expense-Tracker.git
cd Expense-Tracker
```

# How to use ?

To add an expense: `node app.js add --description DESCRIPTION --amount AMOUNT`

To list expenses: `node app.js list`

To get a summary: `node app.js summary`

To get a summary of a specific month: `node app.js summary --month MONTH`

To delete an expense: `node app.js --delete id`

# Examples

```
$ node app.js add --description "Lunch" --amount 20
Expense added successfully (ID: 1)

$ node app.js add --description "Dinner" --amount 10
Expense added successfully (ID: 2)

$ node app.js list
ID  Date       Description  Amount
1   2024-08-06  Lunch        $20
2   2024-08-06  Dinner       $10

$ node app.js summary
Total expenses: $30

$ node app.js delete --id 1
Expense deleted successfully

$ node app.js summary
Total expenses: $20

$ node app.js summary --month 8
Total expenses for August: $20
```
