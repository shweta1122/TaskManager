const taskList = fetch("/todos").then(res => res.json()).then(data => {
    console.log(data)
    displayTodo(data)



})
const table = document.getElementById("tbody")
function displayTodo(taskList) {
    console.log(taskList)
    let sortedTaskList = sortByDate(taskList)
    console.log(sortedTaskList)
    // for (i = 0; i < sortedTaskList.length; i++) {
    console.log(sortedTaskList[0].title)
    const tableRow = '<tr id ="${sortedTaskList[0].id}">

                       <td> "${sortedTaskList[0].title}" </td>

                       </tr>';
    // document.querySelector('.data').innerHTML = tableRow
    const position = "beforeend"
    table.insertAdjacentHTML(position, tableRow)
}

function sortByDate(taskList) {
    return taskList.sort(function (a, b) {
        return b.duedate.localeCompare(a.duedate);
    });
}