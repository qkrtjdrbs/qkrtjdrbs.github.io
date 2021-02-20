const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDoList";
let toDos = [];
let toDosId = 0;

function handleClick(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return parseInt(li.id) !== toDo.id;
  });
  toDos = cleanToDos;
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const toDo = toDoInput.value;
  paintToDo(toDo);
  toDoInput.value = "";
}

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  toDosId += 1;
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDosId;
  delBtn.innerHTML = "✂";
  delBtn.addEventListener("click", handleClick);
  span.innerText = text + " ";
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function init() {
  const toDoList = localStorage.getItem(TODO_LS);
  if (toDoList !== null) {
    const parsedToDos = JSON.parse(toDoList);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
