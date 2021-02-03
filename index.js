const input = document.querySelector("input");
const button = document.querySelector(".add");
const todoList = document.querySelector(".todoList");
document.addEventListener('DOMContentLoaded', loadTodos)
document.querySelector('#todos').addEventListener('change', todoFilter)
button.addEventListener("click", addTodo);




function addTodo() {
    const div = document.createElement("div");
    const li = document.createElement("li");
    const deleteButton = document.createElement("i");
    const doneButton = document.createElement("i");

    div.classList.add("todoDiv");
    li.classList.add("todoLi");

    deleteButton.classList.add("fas");
    deleteButton.classList.add("fa-minus-square");
    deleteButton.classList.add("del");

    doneButton.classList.add("fas");
    doneButton.classList.add("fa-check-square");
    doneButton.classList.add("done");

    todoList.appendChild(div);
    div.appendChild(li);
    div.appendChild(deleteButton);
    div.appendChild(doneButton);
    li.textContent = input.value;

    saveLocalStore(input.value)
    input.value = null;

    const delTodo = document.querySelectorAll(".del");
    delTodo.forEach((button) => button.addEventListener("click", deleteTodo));

    const doneTodo = document.querySelectorAll('.done');
    doneTodo.forEach((button) => button.addEventListener('click', dashedTodo));
}

function todoFilter(){
  const todos = document.querySelectorAll('.todoDiv')
  const value = this.value
  todos.forEach((todo) => {

    switch(value){
      case 'all': {
        todo.style.display = 'flex'
      }
      break
      case 'done': {
        if(todo.classList.contains('remove')){
          todo.style.display = 'flex'
        }
        else{
          todo.style.display = 'none'
        }
        break
      }
      case 'notDone': {
        if(!todo.classList.contains('remove')){
          todo.style.display = 'flex'
        }
        else{
          todo.style.display = 'none'
        }
      }
    }
  })
}

function saveLocalStore(savedTodo){
  let todos;
  if(!window.localStorage.todos){
    todos = []
  }
  else {
    todos = JSON.parse(window.localStorage.todos)
  }
  todos.push(savedTodo)
  window.localStorage.todos = JSON.stringify(todos)
}

function delFromLocalStore(todo) {
  const theTodo = todo
  const todolist = JSON.parse(window.localStorage.todos)
  const deleteTodo = todolist.filter(todo => todo !== theTodo)
  window.localStorage.todos = JSON.stringify(deleteTodo)
}

function loadTodos () {
  if(window.localStorage.todos){
    const todos = JSON.parse(window.localStorage.todos)
    todos.forEach(todo => {
      const div = document.createElement("div");
      const li = document.createElement("li");
      const deleteButton = document.createElement("i");
      const doneButton = document.createElement("i");

      div.classList.add("todoDiv");
      li.classList.add("todoLi");

      deleteButton.classList.add("fas");
      deleteButton.classList.add("fa-minus-square");
      deleteButton.classList.add("del");

      doneButton.classList.add("fas");
      doneButton.classList.add("fa-check-square");
      doneButton.classList.add("done");

      todoList.appendChild(div);
      div.appendChild(li);
      div.appendChild(deleteButton);
      div.appendChild(doneButton);
      li.textContent = todo
      window.localStorage.todos = JSON.stringify(todos)
      
      const delTodo = document.querySelectorAll(".del");
      delTodo.forEach((button) => button.addEventListener("click", deleteTodo));
  
      const doneTodo = document.querySelectorAll('.done');
      doneTodo.forEach((button) => button.addEventListener('click', dashedTodo));
  
    })
  }
  else {
    console.log('fuck');
  }
}


function deleteTodo() {
  const todo = this.parentElement;
  todo.remove()
  delFromLocalStore(this.parentElement.textContent)
}

function dashedTodo() {
  const todos = this.parentElement
  todos.classList.toggle('remove')
}