var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
 //form submit event
 form.addEventListener('submit',addItem);
 // delete event
 itemList.addEventListener('click',removeItem);

 // add item
 function addItem(e){
    e.preventDefault();
   //  console.log("enter");
   // get the input value
   var newItem = document.getElementById("item").value;
   //create new li element
   var li = document.createElement("li");
   //add class
   li.className = "list-group-item";
   //add text node with input value
   li.appendChild(document.createTextNode(newItem));
   //create del button element
   var deletebtn = document.createElement('button');
   //add classes to del button
   deletebtn.className = "btn btn-danger btn-sm float-right delete";
   //append text Node
   deletebtn.appendChild(document.createTextNode('X'));
   //append button to li
   li.appendChild(deletebtn);
   //create edit button element
   var editBtn = document.createElement('button');
   //add classed to edit button
   editBtn.className="btn btn-success btn-sm float-right mr-2 edit";
   editBtn.appendChild(document.createTextNode("edit"));
   li.appendChild(editBtn);
   //append li to list
   itemList.appendChild(li);
 }
 // remove item
 function removeItem(e){
   if(e.target.classList.contains('delete')){
      if(confirm("cofirm delete the item")){
         var li=e.target.parentElement;
         itemList.removeChild(li);
      }
   }
   // console.log("enter");
 }