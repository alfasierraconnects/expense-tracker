document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.querySelector(".expense-form");
  const expenseList = document.querySelector(".expense-list");
  const amountInput = document.getElementById("amount");
  const descriptionInput = document.getElementById("description");
  const categoryInput = document.getElementById("category");

  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const amount = amountInput.value.trim();
    const description = descriptionInput.value.trim();
    const category = categoryInput.value;

    if (amount !== "" && description !== "") {
      //created an object expense
      const expense = {
        amount,
        description,
        category,
      };

      //saving to local storage
      saveExpense(expense);

      //displaying in the ul
      displayExpenses();

      //resetting form
      expenseForm.reset();
    }
  });

  expenseForm.addEventListener("reset", function () {
    //resetting form
    expenseForm.reset();
  });

  function saveExpense(expense) {
    //created stack in localstorage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  expenseList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      //delete the list after identifies through id
      deleteExpense(event.target.dataset.id);
      //update UI
      displayExpenses();
    } else if (event.target.classList.contains("edit-btn")) {
      // Retrieve expense from local storage
      const expense = getExpense(event.target.dataset.id);

      // Populate the form with the selected expense
      amountInput.value = expense.amount;
      descriptionInput.value = expense.description;
      categoryInput.value = expense.category;

      // Delete the expense from local storage and UI
      deleteExpense(event.target.dataset.id);
      displayExpenses();
    }
  });

  function displayExpenses() {
    expenseList.innerHTML = "";
    //get expenses stack if available else empty stack;
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.forEach((expense, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${expense.amount} - ${expense.description} - ${expense.category}
        <button class="delete-btn" data-id="${index}">Delete</button>
        <button class="edit-btn" data-id="${index}">Edit</button>`;
      expenseList.appendChild(li);
    });
  }

  function deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses = expenses.filter((expense, index) => index != id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function getExpense(id) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    return expenses[id];
  }

  //display expenses when page loads
  displayExpenses();
});
