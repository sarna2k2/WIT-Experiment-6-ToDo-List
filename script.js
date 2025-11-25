// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addBtn").addEventListener("click", function () {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    addTask(taskText);
    saveTask(taskText);
    taskInput.value = "";
});

function addTask(text, isCompleted = false) {
    let ul = document.getElementById("taskList");

    let li = document.createElement("li");
    li.textContent = text;

    if (isCompleted) li.classList.add("completed");

    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateStorage();
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "deleteBtn";

    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        li.remove();
        updateStorage();
    });

    li.appendChild(deleteBtn);
    ul.appendChild(li);
}

// Save tasks to Local Storage
function saveTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from Local Storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

// Update Local Storage whenever something changes
function updateStorage() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
