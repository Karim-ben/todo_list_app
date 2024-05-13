class TodoList {
  todos = [];
  todoEdited=null
  id = 0;
  html = `
     <div class="todo_item">
     <div class="todo_item_left">

         <label for="">
             <input type="checkbox"  id="">
         </label>
         <div class="todo_text">todo1</div>
     </div>
     <div class="todo_item_right">

         <i class="fa-regular fa-trash-can"></i>
     </div>
 </div>
     
     
     `;
  constructor(listElements = null,inptEl=null) {
    this.listElements = listElements;
    this.inptEl = inptEl;
  
    this.getTodos("todos");
  }

  setTodos(key) {
    localStorage.setItem(key, JSON.stringify(this.todos));
  }
  getTodos(key) {
    this.todos = JSON.parse(localStorage.getItem(key)) || [];
  }
  createElementHtml(el = null, classNames = [], attributes = {}) {
    let element = document.createElement(el);
    element.classList.add(...classNames);
    if (attributes) {
      for (const key in attributes) {
        if (Object.hasOwnProperty.call(attributes, key)) {
          element.setAttribute(key, attributes[key]);
        }
      }
    }
    return element;
  }
  addTodo(todo_text) {
    this.id = this.todos.length + 1;
    let todo = {
      id: this.id,
      text: todo_text,
      isCompleted: false,
    };
    this.getTodos("todos");
    this.todos.push(todo);
    this.setTodos("todos");
  }

  displayTodos() {
    todo.listElements.innerHTML = "";
  
    this.todos.forEach((todo) => {
      //create elements
      let todoEl = this.createElementHtml("div", ["todo_item"]);
      let todoElLeft = this.createElementHtml("div", ["todo_item_left"]);
      let todoElRight = this.createElementHtml("div", ["todo_item_right"]);
      let lebelEl = this.createElementHtml("label");
      let checkBoxEl = this.createElementHtml("input", [], {
        type: "checkbox",
        id: "checkbox",
      });

      let todoElText = this.createElementHtml("div", ["todo_text"]);
      let editIconEl = this.createElementHtml("i", ["fa-regular", "fa-pen-to-square"]);
      let deletIconEl = this.createElementHtml("i", ["fa-regular", "fa-trash-can"]);

      deletIconEl.onclick = () => this.deletTodo(todo.id);
      editIconEl.onclick=() => this.editTodo(todo.id)
      checkBoxEl.onchange = (e) => this.checkTodo(e, todo.id);
      todo.isCompleted
        ? (checkBoxEl.checked = true)
        : (checkBoxEl.checked = false);

      //fill todo info
      todoElText.textContent = todo.text;
      todo.isCompleted
        ? todoElText.classList.add("completed")
        : todoElText.classList.remove("completed");
      deletIconEl.id = todo.id;

      //append elemenets
      todoElRight.appendChild(editIconEl);
      todoElRight.appendChild(deletIconEl);
      lebelEl.appendChild(checkBoxEl);
      todoElLeft.appendChild(lebelEl);
      todoElLeft.appendChild(todoElText);

      todoEl.appendChild(todoElLeft);
      todoEl.appendChild(todoElRight);
      this.listElements.appendChild(todoEl);
    });
  }
  deletTodo(id) {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== Number(id);
    });
    this.setTodos("todos");
    this.displayTodos();
  }
  clearAllTodos() {
    this.todos = [];
    this.setTodos("todos");
    this.displayTodos();
  }

  checkTodo(e, id) {
    let isChecked = e.target.checked;
    this.getTodos("todos");
    this.todos = this.todos.map((todo) => {
      if (todo.id == id) {
        isChecked ? (todo.isCompleted = true) : (todo.isCompleted = false);
        return todo;
      } else {
        return todo;
      }
    });
    this.setTodos("todos");
    this.displayTodos();
  }
  statusTodo(status) {
    this.getTodos("todos");
    switch (status) {
      case "pending":
        this.todos = this.todos.filter((todo) => {
          return !todo.isCompleted;
        });
        break;

      case "completed":
        this.todos = this.todos.filter((todo) => {
          return todo.isCompleted;
        });
        break;

      case "all":
        break;
    }
 
    this.displayTodos()
  }

  editTodo(id){
   this.getTodos("todos")

   this.todoEdited=this.todos.find((todo) => todo.id==Number(id))
   this.inptEl.value=this.todoEdited.text
  
  
  }
  updateTodo(todo_edited){
        this.getTodos('todos')
        this.todos=this.todos.map((todo) => {
           return todo.id==todo_edited.id ? todo_edited :todo
        })
        this.setTodos('todos')
        this.displayTodos()
        this.todoEdited=null
  }
}
