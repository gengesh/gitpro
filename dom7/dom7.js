var items = document.querySelector('#items');
// parentNode
// console.log(items.parentNode);
// console.log(items.parentNode.parentNode.parentNode);
// console.log(items.parentElement.parentElement.parentElement);
//childNodes
// console.log(items.childNodes);
// console.log(items.children);
// console.log(items.children[1]);
// items.children[1].style.backgroundColor="yellow";
// firstChild
// console.log(items.firstChild);
// firstElementChild
// console.log(items.firstElementChild);
// console.log(items.lastElementChild);
// nextSibling
// console.log(items.nextSibling);
// console.log(items.nextElementSibling);
//previousSibling
// console.log(items.previousSibling);
// console.log(items.previousElementSibling);
// items.previousElementSibling.style.backgroundColor="green";
//createElement


// creat a div
var newDiv = document.createElement("div");
newDiv.className="hello";
newDiv.id = 'hello1';
newDiv.setAttribute("title","hello div");
// create text Node
var newDivText = document.createTextNode("Hello World");
// add text to div
newDiv.appendChild(newDivText);
// console.log(newDiv);
var item = document.querySelector( "#items");

// var h1 = document.querySelector("header h1");
var  item1 = document.querySelector("li:nth-child(1)");
// console.log(item1);
newDiv.style.fontSize="30px";
item.insertBefore(newDiv,item1);

