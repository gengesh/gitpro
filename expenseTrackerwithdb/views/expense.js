
var form = document.getElementById("addForm");
var itemList = document.getElementById('items');
var addExpenseBtn = document.getElementById('addExpenseBtn');
var updateExpenseBtn = document.getElementById('updateExpenseBtn');
var editId;
window.addEventListener("DOMContentLoaded", ()=>{
    allDetails();
     editId = null;
})
// form.addEventListener("submit",addDetails);
addExpenseBtn.addEventListener("click",addDetails);
itemList.addEventListener('click',removeItem);
updateExpenseBtn.addEventListener('click',updateDetails);

function allDetails(){
    axios.get('http://localhost:4000/')
    .then((response) => {
        console.log(response.data.allExpenses);
        for(var i=0;i<response.data.allExpenses.length;i++){
            let expense  = response.data.allExpenses[i];
            var content = expense.amount+" : "+expense.description+" : "+expense.category;
        //create new li element
 var li = document.createElement("li");
 //add class
 li.className = "list-group-item";
 //add text node with input value
 li.appendChild(document.createTextNode(content));
        var span = document.createElement('span');
        span.style.display="none"
        span.appendChild(document.createTextNode(expense.id));
 //create del button element
 var deletebtn = document.createElement('button');
 //add classes to del button
 deletebtn.className = "btn btn-danger btn-sm float-right delete";
 //append text Node
 deletebtn.appendChild(document.createTextNode('X'));
 //append button to li
 li.appendChild(span);
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
    }).catch(err => console.log(err));
}
function addDetails(e){
    e.preventDefault();
    var amount = document.getElementById('amount').value;
    // console.log(amount);
    var description = document.getElementById('description').value;
    // console.log(description);
    var category = document.getElementById('category').value;
    // console.log(category);
    var details = amount+" : "+description+" : "+category;
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
 var id = editId;
 const obj = {
    id:id,
    amount:amount,
    description:description,
    category:category
 };
 axios.post('http://localhost:4000/',obj)
 .then((response) =>{
    console.log(response);
    itemList.appendChild(li);
    addExpenseBtn.style.display="block";
    updateExpenseBtn.style.display="none";
    // console.log("this is else part id is:",id);
    editId = null;
 }).catch((err) => {
   console.log(err);  
 })
}
function removeItem(e){
    if(e.target.classList.contains('delete')){
       if(confirm("cofirm delete the details")){
          let li=e.target.parentElement;
          let expense_id=li.childNodes[1].textContent;
        //  itemList.removeChild(li);
        // console.log("this is delete part",expense_id);
        axios.delete(`http://localhost:4000/delete/${expense_id}`)
          .then((response) => {
            console.log(response);
            itemList.removeChild(li);
          })
          .catch(err => console.log(err));
       }
    }else if(e.target.classList.contains('edit')){
        let li=e.target.parentElement;
        let obj1=li.firstChild.data;
        let str=obj1.split(":");
        let expense_id=li.childNodes[1].textContent;
        console.log(str);
        //  axios.get(`http://localhost:4000/update/${expense_id}`)
        // .then((response) => {
        //   console.log(response);
          editId = expense_id;
          if(editId){
            addExpenseBtn.style.display="none";
            updateExpenseBtn.style.display="block";
            // console.log("this is if condition: id is",editId);
           }else{
            editId = null;
            addExpenseBtn.style.display="block";
            updateExpenseBtn.style.display="none";
            // console.log("this is else part id is:",editId);
           }
           
          console.log("editId is : ",editId);
          document.getElementById('amount').value=Number(str[0]);
          document.getElementById('description').value=str[1];
          document.getElementById('category').value=str[2];
          itemList.removeChild(li);
  
        // })
        // .catch(err => console.log(err));
     }
       
    // console.log("enter");
  }

  function updateDetails(e){
    e.preventDefault();
    if (e.target.id === 'updateExpenseBtn') {
      const  amount = document.getElementById('amount').value;
      const description = document.getElementById('description').value;
      const category = document.getElementById('category').value;
      const details = amount+" : "+description+" : "+category;
      const obj = {
        id:editId,
        amount:amount,
        description:description,
        category:category
      }
      console.log("while updating editId is ",obj);
      axios.put('http://localhost:4000/update',obj)
      .then((response) => {
        console.log(response);
          
          addExpenseBtn.style.display="block";
          updateExpenseBtn.style.display="none";
          var li = document.createElement("li");
          //add class
          li.className = "list-group-item";
          //add text node with input value
          li.appendChild(document.createTextNode(details));
                 var span = document.createElement('span');
                 span.style.display="none"
                 span.appendChild(document.createTextNode(editId));
          //create del button element
          var deletebtn = document.createElement('button');
          //add classes to del button
          deletebtn.className = "btn btn-danger btn-sm float-right delete";
          //append text Node
          deletebtn.appendChild(document.createTextNode('X'));
          //append button to li
          li.appendChild(span);
          li.appendChild(deletebtn);
          //create edit button element
          var editBtn = document.createElement('button');
          //add classed to edit button
          editBtn.className="btn btn-sm float-right mr-2 edit";
          editBtn.appendChild(document.createTextNode("edit"));
          li.appendChild(editBtn);
          //append li to list
          itemList.appendChild(li);
          editId = null;
           }).catch(err => console.log(err));
    }
  }