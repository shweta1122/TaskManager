
const dt =document.getElementById("date")
console.log("hi")
console.log(dt)
function date() {
    n = new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    console.log(n)
   date.innerHTML = m + "/" + d + "/" + y;
}