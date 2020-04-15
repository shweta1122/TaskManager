//sort by due date

 var data = [{"id":1,"title":"Watch Series5","description":"himym","status":"incomplete","priority":"high","duedate":"2021-12-31T23:59:57.987Z","createdAt":"2020-04-12T12:55:40.998Z","updatedAt":"2020-04-12T19:04:43.890Z"},{"id":2,"title":"Watch Series","description":"sherlock","status":"incomplete","priority":"low","duedate":"2022-12-31T23:59:57.987Z","createdAt":"2020-04-12T13:01:20.422Z","updatedAt":"2020-04-12T19:06:06.245Z"},{"id":3,"title":"Watch Series1","description":"Money heist","status":"complete","priority":"medium","duedate":"2012-12-31T23:59:57.987Z","createdAt":"2020-04-12T18:02:28.964Z","updatedAt":"2020-04-12T18:02:28.964Z"},{"id":4,"title":"Watch Series2","description":"Friends","status":"incomplete","priority":"low","duedate":"2020-12-31T23:59:57.987Z","createdAt":"2020-04-12T18:05:48.295Z","updatedAt":"2020-04-12T18:05:48.295Z"}]
data.sort(function (a, b) {
    return a.duedate.localeCompare(b.duedate);
});
 
//---------------------------------------------------------------
//sort according to priority
data.forEach(element => {
    if (element.priority.toLowerCase() === 'high') {
        element.priority = 0
    }
    else if (element.priority.toLowerCase() === 'low') {
        element.priority = 1
    } else {
        element.priority =2
    }
    
});
data.sort(function(a,b) {
    return a.priority - b.priority
})
// console.log(data)

//--------------------------------------------------------

// sort according to status
