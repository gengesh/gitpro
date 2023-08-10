var li = document.getElementsByTagName('li');
console.log(li);
li[2].style.backgroundColor = "green";
for(let i=0;i<li.length;i++){
    li[i].style.fontWeight = "bold"
}