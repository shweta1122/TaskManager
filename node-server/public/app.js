var global = null
var currId = null;
var taskList = null
var notesList = null
async function onLoad() {
    fromServer = await fetch("/todos", { method: 'GET' })
    taskList = await fromServer.json()

    displayTodo(taskList)
}

async function onLoadNotes() {
    const id = getId()
    console.log(id)
    fromServer = await fetch("/todos/" + id + "/notes", { method: 'GET' })
    notesList = await fromServer.json()

    displayNotes(notesList)
}

const ulist = document.getElementById("ul")
console.log(ulist)
function displayNotes() {
    console.log(ulist)
    console.log(notesList)
    for (i = 0; i < notesList.length; i++) {
        console.log(notesList[i].notes)
        const list = `<li class="list-group-item"> ${notesList[i].notes}</li>`
    }
    ulist.innerHTML += list
}
const table = document.getElementById("tbody")
function displayTodo() {
    table.innerHTML = " "
    console.log("display")
    console.log(taskList)

    //    taskList = sortByDate(taskList)
    for (i = 0; i < taskList.length; i++) {
        //console.log(taskList[i].duedate)
        const tableRow = `<tr id ="${taskList[i].id}">

                       <td> ${(taskList[i].title)} </td>
                       <td> ${taskList[i].description} </td>
                       <td> ${(taskList[i].duedate).substring(0, 10)} </td>
                       <td> ${taskList[i].priority} </td>
                       <td> ${taskList[i].status} </td>
                       <td> 
                        <button type="button" class="btn btn-light " onclick = "window.location.href = 'updateTask.html?id=${taskList[i].id}'">Update Task</button>   </td>
                       
                        <td>  
                         <button type="button" class="btn btn-light"  onclick = "window.location.href = 'Notes.html?id=${taskList[i].id}' ";>Notes</button>  </td>
                     
                       </tr>`;



        table.innerHTML += tableRow
    }
}


function reloadWindow() {
    window.location.replace("updateTask.html")
}

async function addTask() {
    var task = {


        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        duedate: document.getElementById("duedate").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value
    }
    resp = await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })

    console.log(JSON.stringify(task))
    console.log('Data sent from Client side')

    if (resp.status == 201) {
        console.log('Successfully Added')
    } else {
        console.error('Some problem ocurred')
    }

}






function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}






async function updateTask() {
    const id = getId()
    console.log("hi")
    console.log(id)


    var task = {


        // title: document.getElementById("title").value,
        // description: document.getElementById("description").value,
        duedate: document.getElementById("duedate").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value
    }
    resp = await fetch('/todos/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })

    console.log(JSON.stringify(task))
    console.log('Data sent from Client side')

    if (resp.status == 201) {
        console.log('Successfully Added')
    } else {
        console.error('Some problem ocurred')
    }

}





function sortByDate() {
    console.log("sorted")
    // var Table = document.getElementById("tbody");
    // Table.innerHTML = "";
    console.log("reached")
    console.log(taskList)
    taskList.sort(function (a, b) {
        return b.duedate.localeCompare(a.duedate);

    });
    displayTodo()
}

function sortByPriority() {
    taskList.forEach(element => {
        if (element.priority.toLowerCase() === 'high') {
            element.priority = 0
        }
        else if (element.priority.toLowerCase() === 'low') {
            element.priority = 2
        } else {
            element.priority = 1
        }

    });
    taskList.sort(function (a, b) {
        return a.priority - b.priority
    })

    taskList.forEach(element => {
        if (element.priority === 0) {
            element.priority = 'high'
        }
        else if (element.priority === 2) {
            element.priority = 'low'
        } else if (element.priority === 1) {
            element.priority = 'medium'
        }

    });

    displayTodo()
}

function sortByStatus() {
    taskList.sort(function (a, b) {
        return b.status.localeCompare(a.status);
    })
    displayTodo()
}


