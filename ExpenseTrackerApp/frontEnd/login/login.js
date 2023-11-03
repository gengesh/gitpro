const form = document.getElementById("formField");



form.addEventListener("submit",loginDetails);


function loginDetails(e){
e.preventDefault();
console.log("thisis login Details function");
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const obj = {
    email:email,
    password:password
}
        
axios.post('http://localhost:4000/login',obj)
.then(res =>{
        if(res.data.message=="404"){
        response.style = "display:flex";
        response.style = "color:red";
        response.textContent = "email id not found";
        }
        if(res.data.message == "401"){
        response.style = "display:flex";
        response.style = "color:red";
            response.textContent = "password is incorrect";
        }
        if(res.data.message == "200"){
            response.style = "display:flex";
        response.style = "color:red";
            response.textContent = "login successfully";
            window.location.href = '../expense/expense.html';
        }
})
.catch(err => {
   console.log(err);
})
}