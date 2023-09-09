var form = document.getElementById("addForm");
var electitems = document.getElementById('elecitems');
var fooditems = document.getElementById('fooditems');
var skinitems = document.getElementById('skinitems');

form.addEventListener("submit",addDetails);
electitems.addEventListener('click',removeElectItem);
fooditems.addEventListener('click',removefoodItem)
skinitems.addEventListener('click',removeskinItem);

window.addEventListener("DOMContentLoaded",()=>{
    axios
    .get('https://crudcrud.com/api/c7bea3c6e90a4b8383a3b69e50abe610/productDetails')
    .then((response) =>{
        var archive = [];
        for(var i=0;i<response.data.length;i++){
            let user  = response.data[i];
            let detail = user.price +"-"+ user.p_name +"-"+ user.category;

            var li = document.createElement("li");
 //add class
 li.className = "list-group-item";
 //add text node with input value
 li.appendChild(document.createTextNode(detail));
 //create del button element
 var deletebtn = document.createElement('button');
 //add classes to del button
 deletebtn.className = "btn btn-danger btn-sm float-right delete";
 //append text Node
 deletebtn.appendChild(document.createTextNode('Delete'));
 var span = document.createElement('span');
 span.style.display="none"
 span.appendChild(document.createTextNode(user._id));
li.appendChild(span);
 //append button to li
 li.appendChild(deletebtn);
 if(user.category == "Electronics"){
    electitems.appendChild(li);
 }else if(user.category == "Food"){
    fooditems.appendChild(li);
 }else{
    skinitems.appendChild(li);
        }
    }
    })
})


function addDetails(e){
    // console.log("enter");
    e.preventDefault();
    var price = document.getElementById('price').value;
    console.log(price);
    var p_name = document.getElementById('p_name').value;
    console.log(p_name);
    var category = document.getElementById('category').value;
    console.log(category);
    var details = price +"-"+ p_name +"-"+ category;

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
 deletebtn.appendChild(document.createTextNode('Delete'));
 //append button to li
 li.appendChild(deletebtn);
 //create edit button element
//  var editBtn = document.createElement('button');
 //add classed to edit button
//  editBtn.className="btn btn-sm float-right mr-2 edit";
//  editBtn.appendChild(document.createTextNode("edit"));
//  li.appendChild(editBtn);
 //append li to list
 const obj = {
    price,
    p_name,
    category
}
 if(category == 'Electronics'){
    axios.post('https://crudcrud.com/api/c7bea3c6e90a4b8383a3b69e50abe610/productDetails',obj)
    .then((response) => {
        console.log(response)
         electitems.appendChild(li);
    })
    .catch((err) => {
        console.log(err)
    })
   
 }else if(category == 'Food'){
    axios.post('https://crudcrud.com/api/c7bea3c6e90a4b8383a3b69e50abe610/productDetails',obj)
    .then((response) => {
        console.log(response)
        fooditems.appendChild(li);
    })
    .catch((err) => {
        console.log(err)
    })
   
 }else{
    axios.post('https://crudcrud.com/api/c7bea3c6e90a4b8383a3b69e50abe610/productDetails',obj)
    .then((response) => {
        console.log(response)
        skinitems.appendChild(li);
    })
    .catch((err) => {
        console.log(err)
    })
   
    
 }
 
}
function removeElectItem(e){
    if(e.target.classList.contains('delete')){
       if(confirm("cofirm delete the details")){
          let li=e.target.parentElement;
          let user_id=li.childNodes[1].textContent;
          axios
          .delete(`https://crudcrud.com/api/c7bea3c6e90a4b8383a3b69e50abe610/productDetails/${ user_id}`)
          .then((res) => {
              console.log(res);
              electitems.removeChild(li);
          })
          .catch((err) =>{
              console.log(err);
          })
          
       }
    }
    // }else if(e.target.classList.contains('edit')){
    //     let li=e.target.parentElement;
    //     let obj1=li.firstChild.data;
    //     let str=obj1.split("-");
    //     // console.log(str);
    //     document.getElementById('amount').value=str[0];
    //     document.getElementById('description').value=str[1];
    //     document.getElementById('category').value=str[2];
    //     itemList.removeChild(li);

    // }
    // console.log("enter");
  }
  function removefoodItem(e){
    if(e.target.classList.contains('delete')){
       if(confirm("cofirm delete the details")){
          let li=e.target.parentElement;
          let user_id=li.childNodes[1].textContent;
          axios
          .delete(`https://crudcrud.com/api/c7bea3c6e90a4b8383a3b69e50abe610/productDetails/${ user_id}`)
          .then((res) => {
              console.log(res);
              fooditems.removeChild(li);
          })
          .catch((err) =>{
              console.log(err);
          })
          
         
       }
    }
}
function removeskinItem(e){
    if(e.target.classList.contains('delete')){
       if(confirm("cofirm delete the details")){
          let li=e.target.parentElement;
          let user_id=li.childNodes[1].textContent;
          axios
          .delete(`https://crudcrud.com/api/c7bea3c6e90a4b8383a3b69e50abe610/productDetails/${ user_id}`)
          .then((res) => {
              console.log(res);
              skinitems.removeChild(li);
          })
          .catch((err) =>{
              console.log(err);
          })
          
       }
    }
}