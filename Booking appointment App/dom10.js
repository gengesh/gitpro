var form = document.getElementById('addForm');



//add listener to add button
form.addEventListener("submit",addUser);




function addUser(e){
    e.preventDefault();
    var uName = document.getElementById('uname').value;
    var email = document.getElementById('email').value;
    // console.log(uName,email);
    var li = document.createElement('li');
    li.className= "list-group-item p-1 mt-2";
    var listUsers = document.getElementById('listUsers');
    var content = uName+" : "+email;
    li.appendChild(document.createTextNode(content));
    console.log(li);
    listUsers.appendChild(li);
localStorage.setItem(email,uName);
}