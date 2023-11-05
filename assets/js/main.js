/*
          Tasks For Future
------------------------------------
  1 ] Add Drag And Drop Feature For Tasks.
  2 ] Add Counter For Complete Tasks And UnComplete Tasks.
  3 ] Add Dark And Light Mode.
  4 ] Add Complete Tasks To The Bottom Of Tasks In The Close Box Of Comleted Tasks Like Google Tasks App (Mobile).
  5 ] Creat PopUp Before Delete Task Or Delete All Tasks.
  6 ] Try To Do Mix Responsive App With Features Exist At (Google Tasks And Trello). 
*/

let input = document.querySelector(".input");
let btn = document.querySelector(".btn");
let tasks = document.querySelector(".tasks");
// I Will Use It At line 125 To Take index Then Reuse It At line
let updateIndex;

// localStorage.clear();
// --------------------------------------------------------------------------

let arrayOfTasks = [];

// Put Data In Local Storage In Array Of Tasks
if (localStorage.task) {
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
  addToLocalStorage();
  readData();
}


btn.addEventListener("click", () => {
  if (input.value !== "") {
    if (btn.innerText === "Update") {
      // Date Know
      let date = new Date();
      // Create Task And Push It At Array Of Tasks
      arrayOfTasks[updateIndex].value = input.value;
      arrayOfTasks[updateIndex].date = `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`;
      addToLocalStorage();
      readData();
      btn.innerText = "Create Task";
      input.value = "";
    } else {
      // Date Know
      let date = new Date();
      // Create Task And Push It At Array Of Tasks
      let task = {
        value: input.value,
        date: `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`,
        done: false,
      };
      arrayOfTasks.push(task);
      // Add Array Of Tasks To Local Storage 
      addToLocalStorage();
      // Read All Data And Insert It At Page
      readData();
      // Clear Input Filed
      input.value = "";
    }
  }
});

// Read Function --> Read Data From Array Of Tasks And Put Data At Page
function readData() {
  // Clean Tasks From Any Task
  tasks.innerHTML = "";
  // Edit Tasks Element Padding To Fit With Good Style
  if (arrayOfTasks.length === 0) {
    console.log("green");
    tasks.style.padding = "0";
  }
  if (arrayOfTasks.length > 0) {
    tasks.style.padding = "20px";
  }
  // Check To Add Delete All Button At The begin
  if (arrayOfTasks.length > 1) {
    tasks.innerHTML = `
      <button onclick="deleteAll()" class="delete-all">Delete All <span class="number-of-tasks"> ( ${arrayOfTasks.length} ) </span></button>
    `;
  }
  // Read Tasks From Array Of Tasks
  for (let i = 0; i < arrayOfTasks.length; ++i) {
    tasks.innerHTML += `
    <div class="mytask ${arrayOfTasks[i].done === true ? "done" : ""}">
      <div class="task">
        <p class="task-text">${arrayOfTasks[i].value}</p>  
        <div class="date">
          <i class="date_icon fa-regular fa-calendar-days"></i>
          <div class="date_text">${arrayOfTasks[i].date}</div>
        </div>
      </div>
      <i onclick="delFunc(${i})" class="task-icon delete fa-solid fa-trash"></i>
      <i onclick="completeTask(${i}, this)" class="task-icon ${arrayOfTasks[i].done === false ? "ok fa-solid fa-circle-check" : "uncomplete fa-solid fa-circle-xmark"}"></i>
      <i onclick="editTask(${i})" class="task-icon edit fa-solid fa-square-pen"></i>
    </div>
  `;
  }
}

// Add To LocalStorage Function --> Add Array Of Tasks To Local Storage
function addToLocalStorage() {
  localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

// Delete Function --> Delete A Specific Task
function delFunc(index) {
  arrayOfTasks.splice(index, 1);
  addToLocalStorage();
  readData();
}

// Delete All Function -- > Delete All Tasks From Array Of Tasks And Local Storage
function deleteAll() {
  arrayOfTasks = [];
  localStorage.clear();
  readData();
}

// Done Function --> Change Icon And Color Of Complete Task
function completeTask(index, ele) {
  ele.parentElement.classList.toggle("done");
  if (ele.parentElement.classList.contains("done")) {
    arrayOfTasks[index].done = true;
  } else {
    arrayOfTasks[index].done = false;
  }
  addToLocalStorage();
  readData();
}

// Edit Function --> To Edit Task
function editTask(index) {
  input.value = arrayOfTasks[index].value;
  btn.innerText = "Update";
  updateIndex = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  input.select();
}