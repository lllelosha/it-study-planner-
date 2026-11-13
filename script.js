const taskInput = document.querySelector("#taskInput"); 
const addButton = document.querySelector("#addButton"); 
const taskList = document.querySelector("#taskList"); 

 

const totalElement = document.querySelector("#total"); 
const completedElement = document.querySelector("#completed"); 
const emptyMessage = document.querySelector("#emptyMessage"); 

 

// Загружаем задачи из localStorage 
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]"); 

 

// Сохраняем массив задач в браузере 
function saveTasks() { 
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
} 

 

// Обновляем статистику 
function updateStatistics() { 
    const total = tasks.length; 


 

    const completed = tasks.filter( 
        task => task.completed 
    ).length; 

 

    totalElement.textContent = total; 
    completedElement.textContent = completed; 

 

    emptyMessage.style.display = 
        total === 0 ? "block" : "none"; 
} 

 

// Отображаем задачи на странице 
function renderTasks() { 
    taskList.innerHTML = ""; 

 

    tasks.forEach(task => { 
        const li = document.createElement("li"); 

 

        const span = document.createElement("span"); 
        span.className = "task-text"; 
        span.textContent = task.text; 

 

        if (task.completed) { 
            span.classList.add("done"); 
        } 

 

        // Переключаем состояние задачи 
        span.addEventListener("click", () => { 
            task.completed = !task.completed; 
            saveTasks(); 
            renderTasks(); 
        }); 

 


        // Создаём кнопку удаления 
        const deleteButton = document.createElement("button"); 
        deleteButton.textContent = "Удалить"; 
        deleteButton.className = "delete-button"; 

 

        deleteButton.addEventListener("click", () => { 
            tasks = tasks.filter( 
                item => item.id !== task.id 
            ); 

 

            saveTasks(); 
            renderTasks(); 
        }); 

 

        li.append(span, deleteButton); 
        taskList.append(li); 
    }); 

 

    updateStatistics(); 
} 

 

// Добавляем новую задачу 
function addTask() { 
    const text = taskInput.value.trim(); 

 

    if (text === "") { 
        alert("Введите название задачи!"); 
        return; 
    } 

 

    const newTask = { 
        id: Date.now(), 
        text: text, 
        completed: false 


    }; 

 

    tasks.push(newTask); 

 

    saveTasks(); 
    renderTasks(); 

 

    taskInput.value = ""; 
    taskInput.focus(); 
} 

 

// Событие нажатия на кнопку 
addButton.addEventListener("click", addTask); 

 

// Добавление задачи клавишей Enter 
taskInput.addEventListener("keydown", event => { 
    if (event.key === "Enter") { 
        addTask(); 
    } 
}); 

 

// Первоначальное отображение 
renderTasks(); 