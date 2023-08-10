// var items = document.getElementsByClassName('list-group-item');
// for(let i=0;i<items.length;i++){
//     if(i%2==0)
//     items[i].style.backgroundColor="red";
// else
// items[i].style.backgroundColor="green";
// } 
var itemstag = document.getElementsByTagName('li');
for(let i=0;i<itemstag.length;i++){
    if(i%2==0)
    itemstag[i].style.backgroundColor="red";
else
itemstag[i].style.backgroundColor="green";
} 