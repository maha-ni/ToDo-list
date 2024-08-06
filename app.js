const addForm = document.querySelector('.add')
const list = document.querySelector('.todos')
const search = document.querySelector('.search input')
const deleteItem = document.querySelector('.deleted')



let addTask= ()=>{

    const todo = addForm.add.value.trim()

    if(todo){
        generateTemplate(todo)

        addForm.add.value=' '

        saveTask()

    }else{
        alert('please enter a todo')
    }
}


addForm.addEventListener('submit' , (e)=>{
    e.preventDefault()

    addTask()
})

let generateTemplate = (todo)=>{
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt deleted"></i>
        </li>
        `
        list.innerHTML += html

}

let saveTask = ()=>{
    let tasks = []
    list.querySelectorAll('li').forEach((item)=>{
        tasks.push(item.textContent.trim())
    })
    localStorage.setItem('tasks' , JSON.stringify(tasks))
}


let loadTasks = ()=>{
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(generateTemplate)
}

window.addEventListener("load" , loadTasks)
//search

const filterTodos = (term) => {

    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLocaleLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'))

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLocaleLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'))
}

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase()
    filterTodos(term)
})

list.addEventListener('click' , e =>{
    if(e.target.classList.contains('deleted')){
        e.target.parentElement.remove()
        saveTask()
    }
})








// if (e.target.classList.contains('delete')) {
//     e.target.parentElement.remove()
// }





// //get todos from ls
// let todos = localStorage.getItem('todos')


// //try parse data or null
// try {
//     todos = JSON.parse(todos)
//     todos = todos.length ? todos : null
// } catch (e) {
//     todos = null
// }

// //set default values if todos == null
// if (!todos) {
//     todos = [
//         "num1",
//         "num2",
//         "num3",
//     ]
//     localStorage.setItem("todos", JSON.stringify(todos))
// }


// const generateTemplate = (todos) => {
//     todos.forEach((todo, index) => {

//         const html = `
//         <li class="list-group-item d-flex justify-content-between align-items-center">
//         <span>${todo}</span>
//         <i class="far fa-trash-alt deleted"></i>
//         </li>
//         `
//         list.innerHTML += html

//         //delete li
//         deleteItem.addEventListener("click", e => {
//             todos.splice(index, 1)
//             localStorage.setItem('todos', JSON.stringify(todos))
//             generateTemplate(todos)
//         })

//     })
// }

// generateTemplate(todos)
