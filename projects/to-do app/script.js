let input = document.getElementById("taskInput");
let draggedTask = null;


window.onload = function(){
    const savedTasks = JSON.parse(localStorage.getItem("tasks"))||[];

    savedTasks.forEach(taskText => {
        createTask(taskText);
    })
}

input.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function addTask(){
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if(taskText === ""){
        alert("Plase Enter a Task");
        return;
    }

   
    createTask(taskText);
    input.value = "";
    saveTask();
}

function createTask(taskText){
   
    let taskList = document.getElementById("taskList");
    let li = document.createElement("p");
    li.innerText = taskText;
    li.classList.add("task");
    
    let btn = document.createElement("button");
    btn.classList.add("removeBtn");
    btn.innerText = "X";

    let div = document.createElement("div");
    div.classList.add("taskDiv");
    div.draggable = true;

    div.addEventListener("dragstart",()=>{
        draggedTask = div;
        div.classList.add("dragging");
    });

    div.addEventListener("dragend",()=>{
        draggedTask = null;
        div.classList.remove("dragging");
        saveTask();
    })

    div.addEventListener("dragover",(e)=>{
        e.preventDefault();
    });

    div.addEventListener("drop",()=>{
        if(draggedTask !== div){
            const container = document.getElementById("taskList");
            const draggedIndex = [...container.children].indexOf(draggedTask);
            const targetIndex = [...container.children].indexOf(div);
            console.log(targetIndex);

            if(draggedIndex<targetIndex){
                container.insertBefore(draggedTask, div.nextSibling);
            }else{
                container.insertBefore(draggedTask, div);
            }
        }
    });

    li.onclick = () => {
        li.classList.toggle("remove");
    }

    btn.onclick = () => {
        removeTask(div);
    }

    li.addEventListener("dblclick",(e)=>{
        if(e.target.classList.contains("task")){
            enableEdit(e.target);
        }
    });

    div.appendChild(li);
    div.appendChild(btn);
    taskList.appendChild(div);
}

function removeTask(div){
    div.remove();
    saveTask();
}

function saveTask(){
    const task = [];
    let taskDiv = document.querySelectorAll(".task");
    taskDiv.forEach(p => {
        task.push(p.innerText);
    });

    localStorage.setItem("tasks",JSON.stringify(task));
}

function enableEdit(taskText){
    const oldText = taskText.innerText;

    const input = document.createElement("input");
    input.type = "text";
    input.value = oldText;
    input.className = "edit-input";

    taskText.replaceWith(input);
    input.focus();

    input.addEventListener("keydown",function(e){
        if(e.key === "Enter"){
            saveEdit(input);
        }

        if(e.key === "Escape"){
            cancelEdit(input, oldText);
        }
    });

    input.addEventListener("blur",function(){
        saveEdit(input);
    });


}

function cancelEdit(input,oldText){
    const p = document.createElement("p");
    p.innerText = oldText;
    input.replaceWith(p);
}

function saveEdit(input){
    const newText = input.value.trim();
    const p = document.createElement("p");
    p.className = "task";
    p.innerText = newText === ""?"Untitled Task":newText;

    p.addEventListener("dblclick",(e)=>{
        if(e.target.classList.contains("task")){
            enableEdit(e.target);
        }
    });


    input.replaceWith(p);

    saveTask();
}