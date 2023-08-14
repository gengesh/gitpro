let obj1 = {
    name:"ramesh",
    age:29
}
// localStorage.setItem("obj",obj);
var obj_serilized = JSON.stringify(obj1);
// console.log(obj_serilized);
localStorage.setItem("obj2",obj_serilized);
var obj_deserilized = JSON.parse(localStorage.getItem("obj2"));
console.log(obj_deserilized.name);