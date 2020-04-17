//Defin UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all the event Listeners

loadEventListeners();

function loadEventListeners() {
  //Dom load event
  document.addEventListener("DOMContentLoaded", getTask);

  //Add Task Event
  form.addEventListener("submit", addTask);
  //Remove the task events
  taskList.addEventListener("click", removeTask);
  //Clear Task event
  clearBtn.addEventListener("click", clearTask);
  //Filter Task Event

  filter.addEventListener("keyup", filterTask);
}

//Get the task from LS

function getTask() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    //Create a li element
    const li = document.createElement("li");
    li.className = "collection-item";

    //Create a text node and apppend it to li

    li.appendChild(document.createTextNode(task));

    //Create a new Link element
    const link = document.createElement("a");

    //Add Class
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    //Append the li to the ul

    taskList.appendChild(li);
  });
}

//Add task event

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  }
  //Create a li element
  const li = document.createElement("li");
  li.className = "collection-item";

  //Create a text node and apppend it to li

  li.appendChild(document.createTextNode(taskInput.value));

  //Create a new Link element
  const link = document.createElement("a");

  //Add Class
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  //Append the li to the ul

  taskList.appendChild(li);

  //Store the task in Local storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = "";

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  console.log("inside local storage fucntionb");
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task event
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();
      //Remove from LS

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear Tasks

function clearTask(e) {
  taskList.innerHTML = "";

  console.log("inside clear...");

  //Faster
  // while (taskList.firstChild);
  // {
  //   taskList.removeChild(taskList.firstChild);
  // }
  clearTaskFromLocalStorage();
  e.preventDefault();
}

//Clear task from Local Storage

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

//Filter task

function filterTask(e) {
  var text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
