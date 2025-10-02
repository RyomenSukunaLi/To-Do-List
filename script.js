const inputField = document.getElementById("inputField");
const submitTaskBtn = document.querySelector(".submitTaskBtn");
const taskList = document.querySelector(".taskList");
const clearAllBtn = document.getElementById("clearAllBtn");
const taskWrapper = document.querySelector(".taskWrapper")

document.addEventListener("DOMContentLoaded", getItems);

inputField.addEventListener("input", event => {
    if(inputField.value !== ""){
        submitTaskBtn.classList.remove("disabled");
    }
    else{
        submitTaskBtn.classList.add("disabled");
    }
})

submitTaskBtn.addEventListener("click", event => {
    const taskinfo = inputField.value.trim();
    
    inputField.value = "";
    submitTaskBtn.classList.add("disabled");
    
    if(taskinfo == "") return;
    
    let nextIndex = Date.now();
    let key = "Task : " + nextIndex;
    localStorage.setItem(key, taskinfo);

    taskList.style.display = "block";
    const listDiv = document.createElement("div");
    const listItem = document.createElement("li");
    const listDelBtn = document.createElement("button");

    listItem.classList.add("listItem");
    listDelBtn.classList.add("listDelBtn")
    listItem.textContent = taskinfo;
    listDelBtn.textContent = "🗑"
    listDiv.classList.add("listDiv");

    taskWrapper.append(listDiv);
    listDiv.append(listItem, listDelBtn);
    
    editTask(listItem, key);
    delTask(listDelBtn, listItem, listDiv, key);
})

function delTask(listDelBtn, listItem, listDiv, key){
    
    listDelBtn.addEventListener("click", event => {
        taskWrapper.removeChild(listDiv);
        localStorage.removeItem(key);
        const divs = taskWrapper.querySelectorAll("div");
        if(divs.length === 0){
            taskList.style.display = "none";
            localStorage.clear();
        }
    })
}

function editTask(listItem, key){
    listItem.addEventListener("dblclick", event  => {
        listItem.setAttribute("contenteditable", "true");
    })
    listItem.addEventListener("keydown", event => {
        if(event.key === "Enter"){
            listItem.removeAttribute("contenteditable");
            localStorage.setItem(key, listItem.textContent);
        }
    })
}

clearAllBtn.addEventListener("click", event => {
    taskWrapper.innerHTML = "";
    taskList.style.display = "none";
    localStorage.clear();
})

function getItems(){
    for(let i  = 0; i < localStorage.length; i++){
        taskList.style.display = "block";
            const listDiv = document.createElement("div");
            const listItem = document.createElement("li");
            const listDelBtn = document.createElement("button");
            listItem.classList.add("listItem");
            listDelBtn.classList.add("listDelBtn");
            let key = localStorage.key(i); 
            listItem.textContent = localStorage.getItem(key);
            listDelBtn.textContent = "🗑"
            listDiv.classList.add("listDiv");
            taskWrapper.append(listDiv);
            listDiv.append(listItem, listDelBtn);
            delTask(listDelBtn, listItem, listDiv, key);
            editTask(listItem, key);
    }
}