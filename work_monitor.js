let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let text = document.getElementById("taskInput").value.trim();
  let date = document.getElementById("dateInput").value;
  let priority = document.getElementById("priorityInput").value;

  if (text === "") return;

  let task = {
    text: text,
    date: date,
    priority: priority,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";

  console.log(tasks);
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let priorityClass =
      task.priority === "High" ? "priority-high" :
      task.priority === "Medium" ? "priority-medium" : "priority-low";

    li.innerHTML = `
      <div class="top">
        <span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
          ${task.text}
        </span>
        <span class="delete" onclick="deleteTask(${index})">❌</span>
      </div>
      <small>📅 ${task.date || "No date set"}</small>
      <small class="${priorityClass}">🔥 ${task.priority}</small>
    `;

    list.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

renderTasks();