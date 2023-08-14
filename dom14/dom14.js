var form = document.getElementById('addForm');
var listUsers = document.getElementById('listUsers');
function allStorage() {
    var archive = [];
    for (var i = 0; i<localStorage.length; i++) {
        archive[i] = localStorage.getItem(localStorage.key(i));
    //    console.log(archive[i]);
       let user = JSON.parse(archive[i]);
    //    console.log(user.uName);
        // console.log(uName,email);
        var li = document.createElement('li');
        li.className= "list-group-item p-1 mt-2";
        var content = user.uName+" : "+user.email+" : "+user.phone;
        li.appendChild(document.createTextNode(content));
        // console.log(li);
        var button = document.createElement('button');
        button.className="btn btn-danger float-right btn-sm delete";
        button.appendChild(document.createTextNode('delete'));
        var editButton = document.createElement('button');
        editButton.className="btn float-right btn-sm mr-3 edit";
        editButton.appendChild(document.createTextNode("Edit"));
        li.appendChild(button);
        li.appendChild(editButton);
        listUsers.appendChild(li);
    }
}
allStorage();
//add listener to add button
form.addEventListener("submit",addUser);

listUsers.addEventListener("click",deleteUser);


function addUser(e){
    e.preventDefault();
    var uName = document.getElementById('uname').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    // console.log(uName,email);
    var li = document.createElement('li');
    li.className= "list-group-item p-1 mt-2";
    var content = uName+" : "+email+" : "+phone;
    li.appendChild(document.createTextNode(content));
    // console.log(li);
    var button = document.createElement('button');
    button.className="btn btn-danger float-right btn-sm delete";
    button.appendChild(document.createTextNode('delete'));
    var editButton = document.createElement('button');
    editButton.className="btn float-right btn-sm mr-3 edit";
    editButton.appendChild(document.createTextNode("Edit"));
    li.appendChild(button);
    li.appendChild(editButton);
    listUsers.appendChild(li);
    const obj = {
        uName,
        email,
        phone
    }
    var obj_serialized = JSON.stringify(obj);
localStorage.setItem(obj.email,obj_serialized);
}
function deleteUser(e){
    // e.preventDefault();
   if(e.target.classList.contains('delete')){
    if(confirm("cofirm delete the user")){
        let li=e.target.parentElement;
        let obj1=li.firstChild.data;
        // console.log(obj1);
        let str=obj1.split(" : ");
        // console.log(str[1]);
        localStorage.removeItem(str[1]);
        listUsers.removeChild(li);
        // localStorage.removeItem(obj.email);

     }
   }else if(e.target.classList.contains('edit'))
{
    // console.log("enter into edit");
    let li=e.target.parentElement;
    let obj1=li.firstChild.data;
    let str=obj1.split(" : ");
    document.getElementById('uname').value=str[0];
    document.getElementById('email').value=str[1];
    document.getElementById('phone').value=str[2];
    localStorage.removeItem(str[1]);
    listUsers.removeChild(li);

}}