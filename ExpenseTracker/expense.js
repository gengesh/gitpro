var form = document.getElementById("addForm");
var itemList = document.getElementById('items');

form.addEventListener("submit",addDetails);
itemList.addEventListener('click',removeItem);

function addDetails(e){
    console.log("enter");
    e.preventDefault();
    var amount = document.getElementById('amount').value;
    console.log(amount);
    var description = document.getElementById('description').value;
    console.log(description);
    var category = document.getElementById('category').value;
    console.log(category);
    var details = amount +"-"+ description +"-"+ category;

 //create new li element
 var li = document.createElement("li");
 //add class
 li.className = "list-group-item";
 //add text node with input value
 li.appendChild(document.createTextNode(details));
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
 editBtn.className="btn btn-sm float-right mr-2 edit";
 editBtn.appendChild(document.createTextNode("edit"));
 li.appendChild(editBtn);
 //append li to list
 itemList.appendChild(li);
}
function removeItem(e){
    if(e.target.classList.contains('delete')){
       if(confirm("cofirm delete the details")){
          let li=e.target.parentElement;
          itemList.removeChild(li);
       }
    }else if(e.target.classList.contains('edit')){
        let li=e.target.parentElement;
        let obj1=li.firstChild.data;
        let str=obj1.split("-");
        // console.log(str);
        document.getElementById('amount').value=str[0];
        document.getElementById('description').value=str[1];
        document.getElementById('category').value=str[2];
        itemList.removeChild(li);

    }
    // console.log("enter");
  }