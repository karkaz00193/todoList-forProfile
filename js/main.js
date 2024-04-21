
// Далее идет настройка вашего приложения Express.js
const form= document.querySelector('#form')
const taskInput= document.querySelector('#taskInput')
const tasksList= document.querySelector('#tasksList')
const EmptyList= document.querySelector('#emptyList')



form.addEventListener('submit', addTask)
//удаление задач с списка
tasksList.addEventListener('click', DeleteTask)
//зачеркивание задач с списка!
tasksList.addEventListener('click',doneTask)
//реАКТОРИМ код наш 
let tasks=[]
if(localStorage.getItem('tasks')){
 tasks= JSON.parse(localStorage.getItem('tasks'))
tasks.forEach((task)=> renderTask(task))
}


checkEmptyList()

function addTask(event) {  
    //отмена отправки формы
    event.preventDefault()
    const taskText= taskInput.value
    const newTask={
        id:Date.now(),
        text:taskText,
        done:false
    }

    tasks.push(newTask)
    renderTask(newTask)
    saveToLocalStorage()

 taskInput.value=""
 taskInput.focus()
            checkEmptyList()  

        }
function DeleteTask(event){
if(event.target.dataset.action!=='delete') return
//при кликаний на img html разметки (крестик), нужно чтоб не именно крестик срабатывал но и охватил целую кнопку
const ParrentNode=  event.target.closest('.list-group-item')
const id = Number( ParrentNode.id)


//укращаем наш код 
tasks= tasks.filter((task)=>{//удаление задачи через фильтрацию массива
    return task.id !==id //сокращение
})
saveToLocalStorage()
ParrentNode.remove()
checkEmptyList()
}
//querySelector ищет внутри всего док-та а метод closest ищет родителя элемента.

function doneTask(event){
     if(event.target.dataset.action!=='done'){
        return
     }
const parentNode= event.target.closest('.list-group-item')
const id=Number(parentNode.id)

const task=tasks.find((task)=>task.id===id )
  task.done=!task.done
saveToLocalStorage()

const taskTitle= parentNode.querySelector('.task-title')

taskTitle.classList.toggle('task-title--done')

checkEmptyList()

}
function checkEmptyList() {
    if(tasks.length=== 0 ){
    const emptyListHtml=`	
    			<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`
                tasksList.insertAdjacentHTML('afterbegin', emptyListHtml)
            }
    if(tasks.length>0){
        const EmptyListEl= document.querySelector('#emptyList')
            EmptyListEl ? EmptyListEl.remove() : null
        }
   
    }
  
function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function renderTask(task){
  const cssClass=task.done ? "task-title task-title--done":'task-title'
    //формируя css класс
    const taskHTML= `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                    <span class="${cssClass}">${task.text}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                            <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                    </div>
                </li>
                `
                tasksList.insertAdjacentHTML('beforeend', taskHTML)
 
}