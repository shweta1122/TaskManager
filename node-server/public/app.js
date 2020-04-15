var global = null

var taskList = null

async function onLoad() {
    fromServer = await fetch("/todos", { method: 'GET' })
    taskList = await fromServer.json()

    displayTodo(taskList)
}

const table = document.getElementById("tbody")

function displayTodo() {
    table.innerHTML = " "
    console.log("display")
    console.log(taskList)

    //    taskList = sortByDate(taskList)
    for (i = 0; i < taskList.length; i++) {
        console.log(taskList[i].duedate)
        const tableRow = `<tr id ="${taskList[i].id}">

                       <td> ${(taskList[i].title)} </td>
                       <td> ${taskList[i].description} </td>
                       <td> ${(taskList[i].duedate).substring(0, 10)} </td>
                       <td> ${taskList[i].priority} </td>
                       <td> ${taskList[i].status} </td>
                       <td> <a href="updateTask.html"> <button type="button" class="btn btn-light " onclick = assigId(${taskList[i].id});>Update Task</button></a>   </td>
                       
                        <td> <a href="addtaskform.html">  <button type="button" class="btn btn-light  ";>Notes</button></a>  </td>
                     
                       </tr>`;



        table.innerHTML += tableRow
    }
}
 var id =0;
function assigId(id) {
    id = id
}
console.log(id)
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




async function updateTask(id) {
    
    console.log(id)
    
    
    var task = {


        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        duedate: document.getElementById("duedate").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value
    }
    resp = await fetch('/todos/id', {
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
            element.priority =1
        }
        
    });
    taskList.sort(function(a,b) {
        return a.priority - b.priority
    })
     
    taskList.forEach(element => {
        if (element.priority === 0 ) {
            element.priority = 'high'
        }
        else if (element.priority === 2) {
            element.priority ='low'
        } else if(element.priority === 1) {
            element.priority = 'medium'
        }
        
    });

    displayTodo()
}

function sortByStatus() {
    taskList.sort(function(a,b) {
        return b.status.localeCompare(a.status);
   })
   displayTodo()
}


