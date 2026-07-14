const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");
const progressPercent = document.getElementById("progressPercent");

const filterBtns = document.querySelectorAll(".filter");
const themeBtn = document.getElementById("themeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}


function renderTasks(){

    taskList.innerHTML = "";

    let filtered = tasks;

    if(currentFilter === "active"){
        filtered = tasks.filter(task => !task.completed);
    }

    if(currentFilter === "completed"){
        filtered = tasks.filter(task => task.completed);
    }

    filtered.forEach(task=>{

        const li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>

            <span class="task-text ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="actions">

                <button class="edit">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="delete">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        // Complete Task
        li.querySelector("input").addEventListener("change",function(){

            task.completed = this.checked;

            saveTasks();
            renderTasks();

        });

        // Delete Task
        li.querySelector(".delete").addEventListener("click",function(){

            tasks = tasks.filter(t=>t.id!==task.id);

            saveTasks();
            renderTasks();

        });

        // Edit Task
        li.querySelector(".edit").addEventListener("click",function(){

            const newTask = prompt("Edit Task",task.text);

            if(newTask !== null && newTask.trim()!==""){

                task.text = newTask.trim();

                saveTasks();
                renderTasks();

            }

        });

        taskList.appendChild(li);

    });

    updateProgress();

}

// Save LocalStorage
function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}


function updateProgress(){

    const completed = tasks.filter(task=>task.completed).length;

    completedCount.textContent = completed;

    totalCount.textContent = tasks.length;

    let percent = 0;

    if(tasks.length>0){

        percent = Math.round((completed/tasks.length)*100);

    }

    progressPercent.textContent = percent + "%";

}

// Filters
filterBtns.forEach(btn=>{

    btn.addEventListener("click",function(){

        filterBtns.forEach(b=>b.classList.remove("active"));

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        renderTasks();

    });

});






renderTasks();