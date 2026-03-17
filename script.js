// Load tasks when page loads
document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    updateEmptyState();
});

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Add new task
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    saveTask(task);
    renderTask(task);
    input.value = "";
    updateEmptyState();
}

// Render task in UI
function renderTask(task) {
    const list = document.getElementById("taskList");
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
        li.classList.add("completed");
    }

    // Toggle complete
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();
        updateLocalStorage();
        updateEmptyState();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
}

// Save task in localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task));
}

// Update storage after changes
function updateLocalStorage() {
    const listItems = document.querySelectorAll("#taskList li");

    let tasks = [];

    listItems.forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearAll() {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
    updateEmptyState();
}

// Show message if empty
function updateEmptyState() {
    const list = document.getElementById("taskList");
    const msg = document.getElementById("emptyMsg");
    msg.style.display = list.children.length === 0 ? "block" : "none";
}

// 🔥 FILTER FEATURE (Advanced)
function filterTasks(type) {
    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        switch(type) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
            case "pending":
                task.style.display = !task.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}