const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">X</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
