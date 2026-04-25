let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

function displayTasks(data = tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  data.forEach((task, index) => {
    taskList.innerHTML += `
      <div class="task">
        <div class="task-text">
          <h3>${task.title}</h3>
          <p>${task.desc}</p>
        </div>
        <div class="task-actions">
          <button class="edit-btn" onclick="editTask(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const desc = document.getElementById("taskDesc").value.trim();

  if (!title || !desc) {
    alert("Fill all fields");
    return;
  }

  if (editIndex === -1) {
    tasks.push({ title, desc });
  } else {
    tasks[editIndex] = { title, desc };
    editIndex = -1;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  clearInputs();
  displayTasks();
}

function editTask(index) {
  document.getElementById("taskTitle").value = tasks[index].title;
  document.getElementById("taskDesc").value = tasks[index].desc;
  editIndex = index;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function searchTask() {
  const value = document.getElementById("searchBox").value.toLowerCase();

  const filtered = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(value) ||
      task.desc.toLowerCase().includes(value),
  );

  displayTasks(filtered);
}

function clearInputs() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
}

displayTasks();
