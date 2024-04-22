// Grab DOM elements to modify and get data from
const todoForm = document.querySelector("form");
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const tableBody = document.getElementById("todo-list");

// ?? function to create a new Todo row element
function createTodoElement(todo) {
  const todoRow = document.createElement("tr");
  if (todo.completed) {
    todoRow.classList.add("completed-task");
  } else {
    todoRow.classList.remove("completed-task");
  }
  const tableCell = document.createElement("td");

  // Create a title element;
  const titleElement = tableCell.cloneNode();
  titleElement.innerText = todo.title;

  // Create a date element;
  const dateElement = tableCell.cloneNode();
  dateElement.innerText = todo.date;

  // Create a checkbox to handle task completion
  const checkBoxElement = tableCell.cloneNode();
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox"); // <input type="checkbox>";
  checkBox.addEventListener("change", (event) => handleCheckbox(event, todo.id));
  checkBox.checked = todo.completed;
  checkBoxElement.appendChild(checkBox);

  // Append the cells to the table row
  todoRow.append(titleElement, dateElement, checkBoxElement);

  return todoRow;
}

// Function to handle checkBox toggling
function handleCheckbox(event, id) {
  const todos = getTodos();
  const newTodos = todos.map((todo) => {
    if (todo.id === id) {
      if (event.target.checked) {
        return { ...todo, completed: true };
      } else {
        return { ...todo, completed: false };
      }
    }
    return todo;
  });
  saveTodos(newTodos);
  renderTodos()
}

// function to handle firm submission
function handleSubmitForm(event) {
  event.preventDefault();
  // Validate ad sanitie inputs
  // create a todo items and add it to the table element
  const todos = getTodos();
  const todoItem = {
    id: new Date().getTime(),
    title: titleInput.value,
    date: dateInput.value,
    completed: false,
  };

  todos.push(todoItem);
  saveTodos(todos);
  renderTodos();
  // reset form fields so they are ready for new data
  todoForm.reset();
}

// Function to get todod from localstorage
function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

// Function to save todos to local storage
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to render todos in the DOM
function renderTodos() {
  tableBody.innerHTML = "";
  const todos = getTodos();
  todos.forEach((todo) => {
    const todoRow = createTodoElement(todo);
    tableBody.appendChild(todoRow);
  });
}

renderTodos();

// Listen to submit on the form and modify the DOm
todoForm.addEventListener("submit", handleSubmitForm);
