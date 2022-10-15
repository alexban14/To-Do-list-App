// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
// filterOption.addEventListener('click', filterTodo);

// functions
function addTodo(event) {
    event.preventDefault();
    
    // div to wrap around li & delete-complete btns 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    // create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    // add todo to local storage
    saveLocalTodos(todoInput.value);    
    
    // check mark btn
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    
    // delete btn
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    
    // append div
    todoList.appendChild(todoDiv);
    
    // clear input after appending
    todoInput.value = '';
}

function deleteCheck(e) {
    // to see what you are clicking on
    // console.log(e.target);
    
    // deleting TODO only when clicking the trash 
    const item = e.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        // remove item only after animation finishes
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    // mark toDo as done
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


// indexing todos to the local storage
function saveLocalTodos(todo) {
    // check if there is anything already in the web storage
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// show the indexed items form localStorage when page is refreshed
function getTodos() {
    // check if there is anything already in the web storage
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo) => {
        // div to wrap around li & delete-complete btns 
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        
        // create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        // check mark btn
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        
        // delete btn
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        
        // append div
        todoList.appendChild(todoDiv);
    })
}

// remove indexed item form local storage
function removeLocalTodos(todo) {
    // check if there is anything already in the web storage
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // console.log(todo.children[0].innerText);
    const todoIndex = todo.children[0];
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos));
}


// not working function
// function filterTodo(e) {
//     const todos = todoList.childNodes;
//     todos.forEach(function(todo){
//         switch (e.target.value) {
//             case 'all':
//                 todo.style.display = 'flex';
//                 break;
//             case 'completed':
//                 if(todo.classList.contains('completed')) {
//                     todo.style.display = 'flex';
//                 } else {
//                     todo.style.display = 'none';
//                 }
//                 break;
//             case 'uncompleted':
//                 if(!todo.classList.contains('completed')) {
//                     todo.style.display = 'flex';
//                 } else {
//                     todo.style.display = 'none';
//                 }
//             break;
//         }
//     });
// }