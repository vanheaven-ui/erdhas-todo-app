// Grab the DOM elements that we are going to manipulate and those from which we need values
const todoForm = document.querySelector("form");
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const tableBody = document.getElementById("todo-list");

// Function that creates a todoRow for each todo
function createTodoRow(todo) {
  const todoRow = document.createElement("tr");
  // Mark the table row of a todo as complete or incomplete based on the todos completed status
  if (todo.completed) {
    todoRow.classList.add("completed-task")
  } else {
    todoRow.classList.remove("completed-task")
  }
  // Create a general tableCell and clone it to create several table cell elements; improve efficiency
  const tableCell = document.createElement("td");

  // Create title Cell
  const titleElement = tableCell.cloneNode(); // Clones the general tableCell element
  titleElement.innerText = todo.title;

  // Create date Cell
  const dateElement = tableCell.cloneNode(); // Clones the general tableCell element
  dateElement.innerText = todo.date;

  // Create a checkbox to handle completion status
  const checkBoxElement = tableCell.cloneNode(); // Clones the general tableCell element
  // we want to dynamically create <input type="checkbox"> using Javascript
  const checkBox = document.createElement("input"); 
  checkBox.setAttribute("type", "checkbox");
  checkBox.addEventListener("change", (event) => handleChange(event, todo.id));
  checkBox.checked = todo.completed;
  checkBoxElement.appendChild(checkBox);

  // Append the row elements
  todoRow.append(titleElement, dateElement, checkBoxElement);

  return todoRow;
}

// Function to handle checkbox change
function handleChange(event, id) {
  const todos = getTodos(); // Get todos from local storage
  // Update the todo that is being modified as completed or incomplete
  // Use the map method to return a new array with the updated todo
  const newTodos = todos.map((todo) => {
    // Check if todo is what is being modified
    if (todo.id === id) {
      // if checkbox is checked, todo should also be completed
      if (event.target.checked) {
        return {
          ...todo,
          completed: true,
        };
      } else { // If checkbox is unchecked, todo should be incomplete
        return {
          ...todo,
          completed: false,
        };
      }
    }

    // Return the rest of the todos as they are to have a full array
    return todo;
  });

  saveTodos(newTodos); // Save updated todos to local Storage
  renderTodos() // Update the UI with the updated todos
}

// Function to handle form submission
function handleSubmitForm(event) {
  event.preventDefault(); // Prevents the default form behaviour the reloads the page when the form is submitted

  const todos = getTodos(); // Get todos from localStorage

  // Update the todos array by adding a new todo object at the end
  todos.push({
    id: new Date().getTime(), // Give a unique Id to the todo
    title: titleInput.value,
    date: dateInput.value,
    completed: false,
  });

  saveTodos(todos); // Save updated todos in localStorage
  renderTodos(); // Update the UI with the new Todo
  // reset the formInput fields so that they are ready for the next input
  todoForm.reset();
}

// Function to get todos from local storage
function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || []; // If no todos in local Storage, return an empty array
} 

// Function to save todos  in localmStorage
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos)); // make sure to stringify whatever is being saved in localStorage
}

// Function to renderTodos
function renderTodos() {
  // Clear out the table body before rerunning the logic to render todos
  // Avoids creating duplicated todos unnecessarily
  tableBody.innerHTML = ""; 
  // Enumerate the todos and render them as rows in the tabke body
  const todos = getTodos();
  todos.forEach((todo) => {
    const todoRow = createTodoRow(todo); // returns a table row for each todo
    tableBody.appendChild(todoRow);
  });
}

// This function call updates the UI with todos from localStorage everytime the page loads
renderTodos(); 

// Attach an event listenr on the form and listen for submit event and handle that
todoForm.addEventListener("submit", handleSubmitForm);
