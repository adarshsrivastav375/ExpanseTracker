document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("input-form");
  const expenseList = document.getElementById("expanse-list");
  const totalExpanse = document.getElementById("total");
  let expenses = [];
  //set item
  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  //get item

  function loadExpenses() {
    const savedexpenses = JSON.parse(localStorage.getItem("expenses"));
    if (savedexpenses) {
      expenses = savedexpenses;
      expenses.forEach((expense) => addExpenseToTable(expense));
      updateTotalExpenses();
    }
  }

  function addExpenseToTable(expense) {
    const newRow = expenseList.insertRow();
    newRow.innerHTML = `<td>${expense.amount}</td>
             <td>${expense.description}</td>
             <td>${expense.category}</td>
             <td>${expense.date}</td>
             <td><button class="edit-btn btn btn-info">Edit</button> <button class="delete-btn btn btn-danger">Delete</button></td>`;
  }

  function addexpense(amount, description, category, date) {
    const expense = { amount, category, description, date };
    expenses.push(expense);
    addExpenseToTable(expense);
    saveExpenses();
    updateTotalExpenses();
  }

  //upadate total
  function updateTotalExpenses() {
    const totalExpenses = expenses.reduce(
      (total, expense) => total + parseFloat(expense.amount),
      0
    );
    totalExpanse.textContent = totalExpenses.toFixed(2);
  }
  // Function to delete expense
  function deleteExpense(row, index) {
    expenses.splice(index, 1);
    row.remove();
    saveExpenses();
    updateTotalExpenses();
  }

  function editExpense(row, index) {
    const expense = expenses[index];
    document.getElementById("amount").value = expense.amount;
    document.getElementById("category").value = expense.category;
    document.getElementById("description").value = expense.description;
    document.getElementById("date").value = expense.date;

    expenses.splice(index, 1);
    row.remove();
    saveExpenses();
    updateTotalExpenses();
  }

  // Event: Add expense
  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;

    addexpense(amount, category, description, date);
    expenseForm.reset();
  });
  //delete and edit
  expenseList.addEventListener("click", function (e) {
    let row = e.target.parentElement.parentElement;
    const index = row.rowIndex - 1;
    if (e.target.classList.contains("delete-btn")) {
      deleteExpense(row, index);
    } else if (e.target.classList.contains("edit-btn")) {
      editExpense(row, index);
    }
  });
  loadExpenses();
});
