// // console.dir(document);
// console.log(document.domain)
// console.log(document.URL);
// console.log(document.title);
// console.log(document.doctype);
// console.log(document.head);
// console.log(document.body);
// // console.log(document.all[9].textContent = "Hello");
// var headertitle = document.getElementById('header-title');
// var header = document.getElementById('main-header');
// console.log(headertitle);
// console.log(headertitle.textContent);
// console.log(headertitle.innerText);
// headertitle.innerHTML = "<h6>Hello</h6>";
// header.style.borderBottom = 'solid 3px #000';
// var items = document.getElementsByClassName('list-group-item');
//  console.log(items);
// console.log(items[1]);
// items[1].textContent = 'hello 2';
// items[1].style.fontWeight = "bold";
// items[1].style.backgroundColor ="green";
// // items.style.backgroundColor = "#f4f4f4";
// for(var i=0;i<items.length;i++){
//     items[i].style.backgroundColor = "yellow";
// }

// var li = document.getElementsByTagName('li');
// console.log(li);
// console.log(li[1]);
// li[1].textContent = "Hello 2";
// var header = document.querySelector('#main-header');
// header.style.borderBottom = "solid 4px #ccc";

// var input = document.querySelector('input');
// input.value = "hello world";
// var submit = document.querySelector('input[type="submit"]');
// submit.value="send";
// var item = document.querySelector(".list-group-item");
// item.style.color = "red";
// var lastitem = document.querySelector(".list-group-item:last-child");
// lastitem.style.color = "blue";
// var seconditem = document.querySelector(".list-group-item:nth-child(2)");
// seconditem.style.color = "coral";
var titles = document.querySelectorAll(".title");
console.log(titles);
titles[0].textContent = "hello";
var odd = document.querySelectorAll("li:nth-child(odd)");
for(var i=0;i<odd.length;i++){
    odd[i].style.backgroundColor= "#f4f4f4";
}
