const btnEl=document.querySelector('.fa-circle-plus')
const inptEl=document.querySelector('.todo_input input')
const listEl=document.querySelector('.todo_list')
const clearAllEl=document.querySelector('.control_clear_all')
const controlEl=document.querySelector('.control_left')


let todo = new TodoList(listEl,inptEl);

window.onload=todo.displayTodos()
btnEl.addEventListener('click', function (e) {
    [...controlEl.children].forEach(child => child.classList.remove("active"));
    [...controlEl.children][0].classList.add("active")
   let todo_text=inptEl.value
   if(!todo.todoEdited){

       todo.addTodo(todo_text)
   }else{
    todo.updateTodo({...todo.todoEdited,text:todo_text})
   }
   
   todo.displayTodos()
   inptEl.value=""
});

clearAllEl.addEventListener('click', function (e) {
    todo.clearAllTodos()
});

controlEl.addEventListener('click', function (e) {
   [...controlEl.children].forEach(child => child.classList.remove("active"));
   e.target.classList.add("active")
 
  todo.statusTodo(e.target.textContent)
});

